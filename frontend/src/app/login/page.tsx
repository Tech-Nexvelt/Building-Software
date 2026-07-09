import { LoginForm } from '@/modules/auth/components/LoginForm';
import { Package, TrendingUp, ShieldCheck, Cloud, Zap } from 'lucide-react';

export const metadata = {
  title: 'Sign In — Nexvelt POS',
  description: 'Login to Nexvelt POS dashboard.',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex bg-white">
      
      {/* Left Section - Branding & Features */}
      <div className="hidden lg:flex flex-col w-1/2 relative overflow-hidden bg-hero-gradient">
        {/* Glow Effects */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#00D9D9]/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#35F5FF]/10 rounded-full blur-[150px] translate-x-1/3 translate-y-1/3 pointer-events-none" />
        
        {/* Content */}
        <div className="relative z-10 flex flex-col h-full p-16 xl:p-24 justify-between">
          <div>
            <div className="flex items-center gap-3 mb-16">
              <div className="w-10 h-10 rounded-xl bg-button-gradient flex items-center justify-center shadow-glow">
                <Package className="w-5 h-5 text-[#05080D]" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">Nexvelt <span className="text-[#00D9D9]">POS</span></span>
            </div>

            <h1 className="text-[42px] xl:text-[54px] font-bold text-white leading-[1.1] mb-6 tracking-tight">
              Enterprise <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#35F5FF] to-[#00D9D9]">Automation</span><br />
              for Modern Business
            </h1>
            
            <p className="text-lg text-[#C7D2DA] max-w-[480px] leading-relaxed mb-16">
              A premium, high-performance point of sale system designed to scale your operations with unmatched reliability and speed.
            </p>

            <div className="grid grid-cols-2 gap-6 max-w-[600px]">
              <FeatureCard 
                icon={<Zap className="w-5 h-5 text-[#00D9D9]" />}
                title="Lightning Fast"
                desc="Sub-second processing"
              />
              <FeatureCard 
                icon={<TrendingUp className="w-5 h-5 text-[#00D9D9]" />}
                title="AI Analytics"
                desc="Predictive growth metrics"
              />
              <FeatureCard 
                icon={<Cloud className="w-5 h-5 text-[#00D9D9]" />}
                title="Cloud Sync"
                desc="Real-time multi-store sync"
              />
              <FeatureCard 
                icon={<ShieldCheck className="w-5 h-5 text-[#00D9D9]" />}
                title="Enterprise Security"
                desc="Bank-grade encryption"
              />
            </div>
          </div>

          <div className="flex items-center gap-8 text-[#8D99A6] text-sm font-medium">
            <span>© 2026 Nexvelt Enterprise</span>
            <span>·</span>
            <a href="#" className="hover:text-[#00D9D9] transition-colors">Privacy</a>
            <span>·</span>
            <a href="#" className="hover:text-[#00D9D9] transition-colors">Terms</a>
          </div>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50/50">
        <div className="w-full max-w-[440px]">
          <div className="lg:hidden flex items-center justify-center gap-3 mb-12">
            <div className="w-10 h-10 rounded-xl bg-button-gradient flex items-center justify-center shadow-glow">
              <Package className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-gray-900">Nexvelt <span className="text-[#00D9D9]">POS</span></span>
          </div>
          
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="flex gap-4 p-5 rounded-2xl bg-[#111827]/50 border border-[#1F3C46] backdrop-blur-md transition-all hover:border-[#00D9D9]/50">
      <div className="w-10 h-10 rounded-xl bg-[#18212B] border border-[#1F3C46] flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-white mb-1">{title}</h3>
        <p className="text-sm text-[#8D99A6]">{desc}</p>
      </div>
    </div>
  );
}
