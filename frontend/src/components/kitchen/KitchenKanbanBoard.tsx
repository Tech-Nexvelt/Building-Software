"use client";

import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { useKitchenStore, KitchenOrder } from "@/store/useKitchenStore";
import { Clock, AlertCircle } from "lucide-react";

const COLUMNS = [
  { id: "new", title: "NEW ORDERS", color: "text-red-500", border: "border-red-200", bg: "bg-red-50" },
  { id: "preparing", title: "PREPARING", color: "text-orange-500", border: "border-orange-200", bg: "bg-orange-50" },
  { id: "ready", title: "READY", color: "text-[#00D9D9]", border: "border-[#00D9D9]/30", bg: "bg-[#00D9D9]/10" },
  { id: "served", title: "SERVED", color: "text-green-500", border: "border-green-200", bg: "bg-green-50" },
  { id: "completed", title: "COMPLETED", color: "text-gray-500", border: "border-gray-200", bg: "bg-gray-50" },
];

export function KitchenKanbanBoard() {
  const { newOrders, preparing, ready, served, completed, moveOrder } = useKitchenStore();
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const getListForColumn = (id: string): KitchenOrder[] => {
    switch (id) {
      case "new": return newOrders;
      case "preparing": return preparing;
      case "ready": return ready;
      case "served": return served;
      case "completed": return completed;
      default: return [];
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    
    // Dropped outside a valid column
    if (!destination) return;
    
    // Dropped in the same column at the same position
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    // Execute state move
    moveOrder(
      draggableId,
      source.droppableId as KitchenOrder['status'],
      destination.droppableId as KitchenOrder['status']
    );
  };

  if (!isBrowser) return <div className="h-full w-full flex items-center justify-center">Loading Board...</div>;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex h-full w-full gap-4 overflow-x-auto pb-4">
        {COLUMNS.map((col) => {
          const orders = getListForColumn(col.id);

          return (
            <div key={col.id} className="flex h-full w-80 shrink-0 flex-col rounded-xl bg-gray-100 p-3">
              {/* Column Header */}
              <div className="mb-4 flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <h3 className={`font-bold text-sm ${col.color}`}>{col.title}</h3>
                  <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${col.bg} ${col.color}`}>
                    {orders.length}
                  </span>
                </div>
              </div>

              {/* Droppable Area */}
              <Droppable droppableId={col.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`flex-1 overflow-y-auto rounded-lg transition-colors ${snapshot.isDraggingOver ? 'bg-gray-200/50' : ''}`}
                  >
                    <div className="flex flex-col gap-3 pb-2">
                      {orders.map((order, index) => (
                        <Draggable key={order.id} draggableId={order.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`flex flex-col gap-3 rounded-xl border bg-white p-4 shadow-sm transition-all ${col.border} ${snapshot.isDragging ? 'shadow-lg scale-[1.02] ring-2 ring-[#00D9D9]' : 'hover:shadow-md'}`}
                            >
                              {/* Card Header */}
                              <div className="flex items-start justify-between">
                                <div>
                                  <h4 className="font-bold text-gray-900">{order.order_number}</h4>
                                  <p className="text-xs text-gray-500 mt-0.5">Table {order.table_number}</p>
                                </div>
                                {order.priority === 'high' && (
                                  <span className="flex items-center gap-1 rounded bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-600">
                                    <AlertCircle className="h-3 w-3" /> URGENT
                                  </span>
                                )}
                              </div>

                              {/* Card Body - Items */}
                              <div className="rounded-lg bg-gray-50 p-2 border border-gray-100">
                                <p className="text-[10px] font-bold text-gray-500 mb-1">{order.items.length} ITEMS</p>
                                <ul className="flex flex-col gap-1">
                                  {order.items.slice(0, 3).map((item, i) => (
                                    <li key={i} className="text-xs font-medium text-gray-700 flex justify-between">
                                      <span className="truncate pr-2">{item.quantity}x {item.name}</span>
                                    </li>
                                  ))}
                                  {order.items.length > 3 && (
                                    <li className="text-[10px] text-gray-400 font-bold mt-1">
                                      + {order.items.length - 3} more items
                                    </li>
                                  )}
                                </ul>
                              </div>

                              {/* Card Footer - Timers */}
                              <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                                <div className="flex items-center gap-1.5 text-orange-500">
                                  <Clock className="h-3.5 w-3.5" />
                                  <span className="text-xs font-bold">12:45</span>
                                </div>
                                <button className={`rounded-lg px-4 py-1.5 text-xs font-bold transition-colors ${col.bg} ${col.color}`}>
                                  {col.id === 'new' ? 'Accept' : col.id === 'preparing' ? 'Mark Ready' : 'Update'}
                                </button>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            </div>
          );
        })}
      </div>
    </DragDropContext>
  );
}
