import React, { useState } from "react";
import {
  Leaf,
  Box,
  BarChart3,
  TrendingUp,
  Plus,
  ChevronRight,
  Sparkles,
  Database,
  LogOut,
  Search,
  Globe,
  Bell,
  MapPin,
  AlertTriangle,
  ChevronDown,
  ArrowRight,
} from "lucide-react";

// --- 1. DASHBOARD VIEW (Enterprise Grade) ---
const DashboardView = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState("stock");
  const [selectedCity, setSelectedCity] = useState("Casablanca");

  const moroccanCities = [
    "Casablanca",
    "Tanger",
    "Rabat",
    "Marrakech",
    "Agadir",
    "Fes",
    "Oujda",
    "Kenitra",
    "Nador",
  ];

  return (
    <div className="flex h-screen bg-[#f1f3f4] text-[#1a1c1e] font-sans overflow-hidden">
      {/* Sidebar Slim */}
      <aside className="w-20 lg:w-64 bg-[#0d1b2a] text-white flex flex-col shadow-2xl">
        <div
          onClick={onBack}
          className="p-6 flex items-center gap-3 border-b border-white/5 cursor-pointer hover:bg-white/5 transition-all"
        >
          <div className="bg-[#3bb77e] p-2 rounded-lg text-white shadow-lg shadow-[#3bb77e]/20">
            <Leaf size={22} />
          </div>
          <span className="font-black text-xl hidden lg:block tracking-tighter uppercase">
            KHAZIN<span className="text-[#3bb77e]">SMART</span>
          </span>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <SidebarLink
            active={activeTab === "stock"}
            onClick={() => setActiveTab("stock")}
            icon={<Box size={20} />}
            label="Inventory Hub"
          />
          <SidebarLink
            active={activeTab === "ai"}
            onClick={() => setActiveTab("ai")}
            icon={<BarChart3 size={20} />}
            label="AI Predictions"
          />
          <SidebarLink
            active={activeTab === "dist"}
            onClick={() => setActiveTab("dist")}
            icon={<Globe size={20} />}
            label="Distribution"
          />
          <SidebarLink
            active={activeTab === "alerts"}
            onClick={() => setActiveTab("alerts")}
            icon={<Bell size={20} />}
            label="Expiry Alerts"
          />
        </nav>

        <button
          onClick={onBack}
          className="m-4 flex items-center gap-4 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all font-bold text-sm"
        >
          <LogOut size={20} /> <span className="hidden lg:block">Sign Out</span>
        </button>
      </aside>

      {/* Main Panel */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-20 bg-white border-b border-gray-100 px-8 flex items-center justify-between z-10">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <button className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-xl border border-gray-200 font-bold text-sm hover:border-[#3bb77e] transition-all">
                <MapPin size={16} className="text-[#3bb77e]" /> {selectedCity}{" "}
                <ChevronDown size={14} />
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-100 shadow-2xl rounded-xl hidden group-hover:block z-50 max-h-60 overflow-y-auto">
                {moroccanCities.map((city) => (
                  <div
                    key={city}
                    onClick={() => setSelectedCity(city)}
                    className="px-4 py-2 hover:bg-[#f0f9f4] hover:text-[#3bb77e] cursor-pointer text-sm font-semibold"
                  >
                    {city}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-gray-50 p-2 rounded-full text-gray-400 hover:text-[#3bb77e] cursor-pointer transition-colors">
              <Bell size={20} />
            </div>
            <div className="w-10 h-10 rounded-full bg-[#0d1b2a] border-2 border-[#3bb77e] overflow-hidden shadow-md">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100"
                alt="user profile"
              />
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 bg-[#f8fafb]">
          {activeTab === "stock" && <InventoryTab city={selectedCity} />}
          {activeTab === "ai" && <AIPredictionTab city={selectedCity} />}
          {activeTab === "dist" && <DistributionTab />}
          {activeTab === "alerts" && <AlertsTab />}
        </div>
      </main>
    </div>
  );
};

// --- 2. HOME PAGE (CENTRALIZED STYLE) ---
const LandingPage = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">
      {/* 1. White Professional Header */}
      <nav className="flex justify-between items-center px-10 py-6 bg-white sticky top-0 z-50 border-b border-gray-50">
        <div className="flex items-center gap-2 font-black text-2xl tracking-tighter text-[#0d1b2a]">
          <div className="bg-[#3bb77e] p-1.5 rounded-lg text-white shadow-lg shadow-[#3bb77e]/30">
            <Leaf size={24} fill="currentColor" />
          </div>
          KHAZIN<span className="text-[#3bb77e]">SMART</span>
        </div>
        <div className="flex gap-10 items-center">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 hover:text-[#3bb77e] cursor-pointer transition-colors">
            Solutions
          </span>
          <span className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 hover:text-[#3bb77e] cursor-pointer transition-colors">
            Enterprise
          </span>
          <button
            onClick={onStart}
            className="bg-[#0d1b2a] text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#3bb77e] transition-all shadow-xl shadow-black/10"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* 2. Hero Section (Green Deep Background + Centered) */}
      <section className="bg-gradient-to-b from-[#1a3a3a] via-[#0d1b2a] to-[#0d1b2a] py-28 px-10 text-center relative overflow-hidden">
        {/* Subtle Background Elements */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-[#3bb77e] rounded-full blur-[120px]"></div>
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-[#3bb77e] rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-4xl mx-auto space-y-12 relative z-10">
          {/* Centered Circle Image */}
          <div className="flex justify-center">
            <div className="p-1 bg-[#3bb77e]/30 backdrop-blur-md rounded-full border border-white/20 shadow-[0_0_50px_rgba(59,183,126,0.3)] animate-pulse">
              <img
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=200"
                className="w-24 h-24 rounded-full object-cover border-4 border-[#3bb77e]"
                alt="fresh grocery focus"
              />
            </div>
          </div>

          <div className="space-y-6">
            <h1 className="text-6xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter uppercase italic">
              AI INVENTORY <br />
              <span className="text-[#3bb77e] not-italic underline decoration-8 underline-offset-8">
                REDESIGNED.
              </span>
            </h1>
            <p className="text-xl text-gray-400 font-medium max-w-2xl mx-auto leading-relaxed italic opacity-90">
              Transform your grocery business with the most advanced forecasting
              system in Morocco. Predict demand, eliminate waste, and scale your
              profits.
            </p>
          </div>

          <div className="flex justify-center items-center gap-6 pt-6">
            <button
              onClick={onStart}
              className="group bg-[#3bb77e] text-white px-12 py-6 rounded-3xl font-black text-sm uppercase tracking-[0.3em] flex items-center gap-4 hover:scale-105 transition-all shadow-2xl shadow-[#3bb77e]/40"
            >
              Access System{" "}
              <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. Solutions Grid (Clean White Section) */}
      <section className="py-24 px-10 max-w-7xl mx-auto relative -mt-16 z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <SolutionCard
            icon={<BarChart3 size={32} />}
            title="Forecasting"
            desc="Predict local demand trends for any Moroccan city with up to 98% accuracy."
          />
          <SolutionCard
            icon={<Bell size={32} />}
            title="Expiry Alerts"
            desc="Automated notifications to manage perishable goods before they lose value."
          />
          <SolutionCard
            icon={<Globe size={32} />}
            title="Distribution"
            desc="Intelligent logistics flow between your warehouses in Casablanca, Tanger, and more."
          />
        </div>
      </section>
    </div>
  );
};

// --- 3. HELPER COMPONENTS ---

const SolutionCard = ({ icon, title, desc }) => (
  <div className="group p-10 bg-white rounded-[3rem] shadow-2xl shadow-black/5 border border-gray-50 hover:bg-[#3bb77e] transition-all duration-500 text-center">
    <div className="text-[#3bb77e] group-hover:text-white mb-6 flex justify-center transition-colors">
      {icon}
    </div>
    <h3 className="text-xl font-black uppercase mb-4 text-[#0d1b2a] group-hover:text-white transition-colors tracking-tighter">
      {title}
    </h3>
    <p className="text-gray-400 text-sm font-medium leading-relaxed italic group-hover:text-white/80 transition-colors">
      {desc}
    </p>
  </div>
);

const InventoryTab = ({ city }) => (
  <div className="space-y-8 animate-in fade-in duration-500">
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-black uppercase tracking-tight">
        Stock Analysis: {city}
      </h1>
      <button className="bg-[#0d1b2a] text-white px-6 py-3 rounded-xl font-bold text-xs uppercase">
        + Add Stock
      </button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <KPICard
        title="TOTAL UNITS"
        value="124,500"
        icon={<Database size={16} />}
      />
      <KPICard title="GROWTH" value="+18.4%" icon={<TrendingUp size={16} />} />
      <KPICard
        title="WASTE PREVENTED"
        value="MAD 15.2K"
        icon={<Sparkles size={16} />}
        color="text-[#3bb77e]"
      />
    </div>
    <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
      <div className="h-40 flex items-end gap-3 px-4">
        {[40, 60, 35, 90, 55, 75, 45, 80, 60, 95].map((h, i) => (
          <div
            key={i}
            style={{ height: `${h}%` }}
            className="flex-1 bg-gray-50 hover:bg-[#3bb77e]/20 transition-all rounded-t-lg relative group"
          >
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-black hidden group-hover:block">
              {h}k
            </div>
          </div>
        ))}
      </div>
      <p className="text-center mt-6 text-xs font-black text-gray-300 uppercase tracking-[0.3em]">
        Monthly Inventory Flow
      </p>
    </div>
  </div>
);

const AIPredictionTab = ({ city }) => (
  <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
    <h1 className="text-3xl font-black uppercase tracking-tight text-[#0d1b2a]">
      AI Demand Forecast: {city}
    </h1>
    <div className="bg-[#0d1b2a] text-white p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 p-12 opacity-5">
        <BarChart3 size={200} />
      </div>
      <div className="relative z-10 space-y-6">
        <div className="flex items-center gap-3 text-[#3bb77e] font-black uppercase text-xs tracking-widest">
          <Sparkles size={18} /> Neural Model Active
        </div>
        <p className="text-4xl font-black italic max-w-xl leading-tight">
          "Expect a <span className="text-[#3bb77e]">22% surge</span> in Dairy
          products demand for {city} over the next 48 hours."
        </p>
        <div className="pt-6 flex gap-4">
          <button className="bg-[#3bb77e] text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest">
            Update Purchase Orders
          </button>
          <button className="border border-white/20 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/5 transition-all">
            Detailed Report
          </button>
        </div>
      </div>
    </div>
  </div>
);

const DistributionTab = () => (
  <div className="p-20 text-center bg-white rounded-[3rem] border-2 border-dashed border-gray-100 animate-pulse">
    <Globe size={48} className="mx-auto text-gray-200 mb-4" />
    <h3 className="text-lg font-black uppercase text-gray-300">
      Syncing Moroccan Regional Hubs...
    </h3>
  </div>
);

const AlertsTab = () => (
  <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-500">
    <h1 className="text-3xl font-black uppercase tracking-tight text-red-500">
      Critical Alerts
    </h1>
    <div className="bg-red-50 border border-red-100 p-8 rounded-3xl flex justify-between items-center shadow-sm">
      <div className="flex items-center gap-5">
        <div className="bg-red-500 text-white p-3 rounded-2xl shadow-lg shadow-red-500/20">
          <AlertTriangle size={24} />
        </div>
        <div>
          <p className="font-black text-[#0d1b2a] uppercase tracking-tighter">
            Yogurt Batch #209 Expiring Soon
          </p>
          <p className="text-xs text-red-400 font-bold italic">
            Location: Casablanca Warehouse - Sector A
          </p>
        </div>
      </div>
      <button className="bg-red-500 text-white px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest">
        Clear Stock
      </button>
    </div>
  </div>
);

const SidebarLink = ({ active, icon, label, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl font-bold text-sm transition-all ${active ? "bg-[#3bb77e] text-white shadow-lg shadow-[#3bb77e]/20" : "text-gray-400 hover:bg-white/5 hover:text-white"}`}
  >
    {icon} <span className="hidden lg:block">{label}</span>
  </button>
);

const KPICard = ({ title, value, icon, color = "text-[#0d1b2a]" }) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
    <div className="flex justify-between items-center text-gray-300 text-[10px] font-black uppercase tracking-widest mb-4">
      {title} {icon}
    </div>
    <p className={`text-2xl font-black tracking-tighter ${color}`}>{value}</p>
  </div>
);

export default function App() {
  const [view, setView] = useState("home");
  return view === "home" ? (
    <LandingPage onStart={() => setView("dashboard")} />
  ) : (
    <DashboardView onBack={() => setView("home")} />
  );
}
