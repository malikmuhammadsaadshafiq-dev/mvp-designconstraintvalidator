"use client";

import { useState, useEffect } from "react";
import { DesignCard } from "@/components/DesignCard";
import { Toast } from "@/components/Toast";
import { SkeletonCard } from "@/components/SkeletonCard";
import { validateDesign, cn, formatDate } from "@/lib/utils";

interface DesignSpec {
  id: string;
  name: string;
  width: number;
  height: number;
  backgroundColor: string;
  textColor: string;
  fontSize: number;
  buttonSize: number;
  createdAt: string;
  validations: {
    contrastRatio: number;
    contrastPass: boolean;
    touchTargetPass: boolean;
    fontSizePass: boolean;
    safeAreaPass: boolean;
    overallStatus: "pass" | "warning" | "error";
  };
}

const initialDesigns: DesignSpec[] = [
  {
    id: "1",
    name: "FinTech Dashboard",
    width: 1440,
    height: 900,
    backgroundColor: "#FFFFFF",
    textColor: "#1F2937",
    fontSize: 16,
    buttonSize: 48,
    createdAt: "2024-03-15",
    validations: validateDesign(1440, 900, "#FFFFFF", "#1F2937", 16, 48),
  },
  {
    id: "2",
    name: "Mobile Fitness Tracker",
    width: 390,
    height: 844,
    backgroundColor: "#FEF3C7",
    textColor: "#92400E",
    fontSize: 14,
    buttonSize: 44,
    createdAt: "2024-03-14",
    validations: validateDesign(390, 844, "#FEF3C7", "#92400E", 14, 44),
  },
  {
    id: "3",
    name: "E-commerce Product Card",
    width: 320,
    height: 480,
    backgroundColor: "#FFFFFF",
    textColor: "#111827",
    fontSize: 14,
    buttonSize: 36,
    createdAt: "2024-03-13",
    validations: validateDesign(320, 480, "#FFFFFF", "#111827", 14, 36),
  },
  {
    id: "4",
    name: "Restaurant Menu App",
    width: 428,
    height: 926,
    backgroundColor: "#FFF7ED",
    textColor: "#7C2D12",
    fontSize: 18,
    buttonSize: 56,
    createdAt: "2024-03-12",
    validations: validateDesign(428, 926, "#FFF7ED", "#7C2D12", 18, 56),
  },
  {
    id: "5",
    name: "Healthcare Patient Portal",
    width: 1440,
    height: 900,
    backgroundColor: "#F0FDF4",
    textColor: "#14532D",
    fontSize: 16,
    buttonSize: 48,
    createdAt: "2024-03-11",
    validations: validateDesign(1440, 900, "#F0FDF4", "#14532D", 16, 48),
  },
  {
    id: "6",
    name: "Travel Booking Mobile",
    width: 390,
    height: 844,
    backgroundColor: "#ECFEFF",
    textColor: "#155E75",
    fontSize: 15,
    buttonSize: 44,
    createdAt: "2024-03-10",
    validations: validateDesign(390, 844, "#ECFEFF", "#155E75", 15, 44),
  },
  {
    id: "7",
    name: "SaaS Analytics Dashboard",
    width: 1920,
    height: 1080,
    backgroundColor: "#FAFAF9",
    textColor: "#292524",
    fontSize: 14,
    buttonSize: 32,
    createdAt: "2024-03-09",
    validations: validateDesign(1920, 1080, "#FAFAF9", "#292524", 14, 32),
  },
  {
    id: "8",
    name: "Social Media Feed",
    width: 414,
    height: 896,
    backgroundColor: "#FFFFFF",
    textColor: "#000000",
    fontSize: 16,
    buttonSize: 44,
    createdAt: "2024-03-08",
    validations: validateDesign(414, 896, "#FFFFFF", "#000000", 16, 44),
  },
  {
    id: "9",
    name: "Educational Platform",
    width: 1366,
    height: 768,
    backgroundColor: "#FFFBEB",
    textColor: "#854D0E",
    fontSize: 18,
    buttonSize: 48,
    createdAt: "2024-03-07",
    validations: validateDesign(1366, 768, "#FFFBEB", "#854D0E", 18, 48),
  },
  {
    id: "10",
    name: "Real Estate Listing",
    width: 375,
    height: 812,
    backgroundColor: "#FDF2F8",
    textColor: "#831843",
    fontSize: 16,
    buttonSize: 44,
    createdAt: "2024-03-06",
    validations: validateDesign(375, 812, "#FDF2F8", "#831843", 16, 44),
  },
  {
    id: "11",
    name: "Music Streaming App",
    width: 428,
    height: 926,
    backgroundColor: "#18181B",
    textColor: "#FAFAFA",
    fontSize: 14,
    buttonSize: 48,
    createdAt: "2024-03-05",
    validations: validateDesign(428, 926, "#18181B", "#FAFAFA", 14, 48),
  },
  {
    id: "12",
    name: "Banking Transaction Form",
    width: 1440,
    height: 900,
    backgroundColor: "#FFFFFF",
    textColor: "#DC2626",
    fontSize: 12,
    buttonSize: 32,
    createdAt: "2024-03-04",
    validations: validateDesign(1440, 900, "#FFFFFF", "#DC2626", 12, 32),
  },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<"home" | "dashboard" | "settings">("home");
  const [items, setItems] = useState<DesignSpec[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "name" | "status">("date");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [userName, setUserName] = useState("Design Validator");

  const [formData, setFormData] = useState({
    name: "",
    width: "",
    height: "",
    backgroundColor: "#FFFFFF",
    textColor: "#000000",
    fontSize: "16",
    buttonSize: "44",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const savedItems = localStorage.getItem("designItems");
    const savedDarkMode = localStorage.getItem("darkMode");
    const savedUserName = localStorage.getItem("userName");

    if (savedItems) {
      setItems(JSON.parse(savedItems));
    } else {
      setItems(initialDesigns);
    }

    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
    if (savedUserName) {
      setUserName(savedUserName);
    }

    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem("designItems", JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("userName", userName);
  }, [userName]);

  const filteredItems = items
    .filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "date") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else {
        const statusOrder = { error: 0, warning: 1, pass: 2 };
        return statusOrder[a.validations.overallStatus] - statusOrder[b.validations.overallStatus];
      }
    });

  const handleDelete = (id: string) => {
    setItems(items.filter((i) => i.id !== id));
    setToast({ message: "Design removed successfully", type: "success" });
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = "Design name is required";
    if (!formData.width || Number(formData.width) < 320) errors.width = "Width must be at least 320px";
    if (!formData.height || Number(formData.height) < 568) errors.height = "Height must be at least 568px";
    if (!formData.fontSize || Number(formData.fontSize) < 8) errors.fontSize = "Font size must be at least 8px";
    if (!formData.buttonSize) errors.buttonSize = "Button size is required";
    return errors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const validations = validateDesign(
      Number(formData.width),
      Number(formData.height),
      formData.backgroundColor,
      formData.textColor,
      Number(formData.fontSize),
      Number(formData.buttonSize)
    );

    const newDesign: DesignSpec = {
      id: Date.now().toString(),
      name: formData.name,
      width: Number(formData.width),
      height: Number(formData.height),
      backgroundColor: formData.backgroundColor,
      textColor: formData.textColor,
      fontSize: Number(formData.fontSize),
      buttonSize: Number(formData.buttonSize),
      createdAt: new Date().toISOString().split("T")[0],
      validations,
    };

    setItems([newDesign, ...items]);
    setFormData({
      name: "",
      width: "",
      height: "",
      backgroundColor: "#FFFFFF",
      textColor: "#000000",
      fontSize: "16",
      buttonSize: "44",
    });
    setFormErrors({});
    setToast({ message: "Design validated and added", type: "success" });
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(items, null, 2);
    navigator.clipboard.writeText(dataStr);
    setToast({ message: "Data copied to clipboard", type: "info" });
  };

  const stats = {
    total: items.length,
    pass: items.filter((i) => i.validations.overallStatus === "pass").length,
    warning: items.filter((i) => i.validations.overallStatus === "warning").length,
    error: items.filter((i) => i.validations.overallStatus === "error").length,
    passRate: items.length ? Math.round((items.filter((i) => i.validations.overallStatus === "pass").length / items.length) * 100) : 0,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 dark:from-stone-950 dark:via-stone-900 dark:to-stone-950">
      <nav className="sticky top-0 z-40 bg-white/80 dark:bg-stone-900/80 backdrop-blur-md border-b border-orange-100 dark:border-stone-800">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-amber-500/25">
                DC
              </div>
              <span className="text-xl font-bold text-gray-800 dark:text-gray-100 tracking-tight">
                DesignConstraintValidator
              </span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              {(["home", "dashboard", "settings"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                    activeTab === tab
                      ? "bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-lg shadow-amber-500/25"
                      : "text-gray-600 dark:text-gray-400 hover:bg-orange-50 dark:hover:bg-stone-800"
                  )}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === "home" && (
          <div className="space-y-8 fade-in-up" style={{ "--delay": "0s" } as React.CSSProperties}>
            <section className="bg-white/70 dark:bg-stone-800/70 backdrop-blur-sm rounded-2xl shadow-xl border border-orange-100 dark:border-stone-700 p-6 sm:p-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2 tracking-tight">
                Validate Design Constraints
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Check your UI designs against WCAG standards and mobile constraints
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Design Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g., Mobile Banking App"
                      className={cn(
                        "w-full px-4 py-3 rounded-xl border bg-white dark:bg-stone-900 dark:text-white transition-all",
                        formErrors.name
                          ? "border-rose-500 focus:ring-2 focus:ring-rose-500"
                          : "border-orange-200 dark:border-stone-600 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                      )}
                    />
                    {formErrors.name && <p className="text-rose-500 text-sm">{formErrors.name}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Width (px)
                      </label>
                      <input
                        type="number"
                        value={formData.width}
                        onChange={(e) => setFormData({ ...formData, width: e.target.value })}
                        placeholder="e.g., 390"
                        className={cn(
                          "w-full px-4 py-3 rounded-xl border bg-white dark:bg-stone-900 dark:text-white transition-all",
                          formErrors.width
                            ? "border-rose-500 focus:ring-2 focus:ring-rose-500"
                            : "border-orange-200 dark:border-stone-600 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                        )}
                      />
                      {formErrors.width && <p className="text-rose-500 text-sm">{formErrors.width}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Height (px)
                      </label>
                      <input
                        type="number"
                        value={formData.height}
                        onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                        placeholder="e.g., 844"
                        className={cn(
                          "w-full px-4 py-3 rounded-xl border bg-white dark:bg-stone-900 dark:text-white transition-all",
                          formErrors.height
                            ? "border-rose-500 focus:ring-2 focus:ring-rose-500"
                            : "border-orange-200 dark:border-stone-600 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                        )}
                      />
                      {formErrors.height && <p className="text-rose-500 text-sm">{formErrors.height}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Background Color
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={formData.backgroundColor}
                          onChange={(e) => setFormData({ ...formData, backgroundColor: e.target.value })}
                          className="w-12 h-12 rounded-xl border border-orange-200 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={formData.backgroundColor}
                          onChange={(e) => setFormData({ ...formData, backgroundColor: e.target.value })}
                          className="flex-1 px-4 py-3 rounded-xl border border-orange-200 dark:border-stone-600 bg-white dark:bg-stone-900 dark:text-white"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Text Color
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={formData.textColor}
                          onChange={(e) => setFormData({ ...formData, textColor: e.target.value })}
                          className="w-12 h-12 rounded-xl border border-orange-200 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={formData.textColor}
                          onChange={(e) => setFormData({ ...formData, textColor: e.target.value })}
                          className="flex-1 px-4 py-3 rounded-xl border border-orange-200 dark:border-stone-600 bg-white dark:bg-stone-900 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Font Size (px)
                      </label>
                      <input
                        type="number"
                        value={formData.fontSize}
                        onChange={(e) => setFormData({ ...formData, fontSize: e.target.value })}
                        placeholder="e.g., 16"
                        className={cn(
                          "w-full px-4 py-3 rounded-xl border bg-white dark:bg-stone-900 dark:text-white transition-all",
                          formErrors.fontSize
                            ? "border-rose-500 focus:ring-2 focus:ring-rose-500"
                            : "border-orange-200 dark:border-stone-600 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                        )}
                      />
                      {formErrors.fontSize && <p className="text-rose-500 text-sm">{formErrors.fontSize}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Button Size (px)
                      </label>
                      <input
                        type="number"
                        value={formData.buttonSize}
                        onChange={(e) => setFormData({ ...formData, buttonSize: e.target.value })}
                        placeholder="e.g., 44"
                        className={cn(
                          "w-full px-4 py-3 rounded-xl border bg-white dark:bg-stone-900 dark:text-white transition-all",
                          formErrors.buttonSize
                            ? "border-rose-500 focus:ring-2 focus:ring-rose-500"
                            : "border-orange-200 dark:border-stone-600 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                        )}
                      />
                      {formErrors.buttonSize && <p className="text-rose-500 text-sm">{formErrors.buttonSize}</p>}
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-semibold rounded-xl shadow-lg shadow-amber-500/25 active:scale-95 transition-all duration-200"
                >
                  Validate Design
                </button>
              </form>
            </section>

            <section>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Validated Designs</h2>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search designs..."
                    className="px-4 py-2 rounded-xl border border-orange-200 dark:border-stone-600 bg-white dark:bg-stone-900 dark:text-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                  />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as "date" | "name" | "status")}
                    className="px-4 py-2 rounded-xl border border-orange-200 dark:border-stone-600 bg-white dark:bg-stone-900 dark:text-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                  >
                    <option value="date">Sort by Date</option>
                    <option value="name">Sort by Name</option>
                    <option value="status">Sort by Status</option>
                  </select>
                </div>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <SkeletonCard key={i} />
                  ))}
                </div>
              ) : filteredItems.length === 0 ? (
                <div className="text-center py-16 bg-white/50 dark:bg-stone-800/50 rounded-2xl border border-dashed border-orange-200 dark:border-stone-700">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-orange-100 dark:bg-stone-700 flex items-center justify-center">
                    <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">No designs found</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">Add your first design to start validating constraints</p>
                  <button
                    onClick={() => setActiveTab("home")}
                    className="px-6 py-2 bg-gradient-to-r from-amber-500 to-rose-500 text-white rounded-xl font-medium hover:from-amber-600 hover:to-rose-600 transition-all"
                  >
                    Add Design
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredItems.map((item, index) => (
                    <DesignCard key={item.id} design={item} onDelete={handleDelete} index={index} />
                  ))}
                </div>
              )}
            </section>
          </div>
        )}

        {activeTab === "dashboard" && (
          <div className="space-y-8 fade-in-up" style={{ "--delay": "0s" } as React.CSSProperties}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white/70 dark:bg-stone-800/70 backdrop-blur-sm rounded-2xl shadow-xl border border-orange-100 dark:border-stone-700 p-6">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Total Designs</p>
                <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">{stats.total}</p>
              </div>
              <div className="bg-white/70 dark:bg-stone-800/70 backdrop-blur-sm rounded-2xl shadow-xl border border-orange-100 dark:border-stone-700 p-6">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Pass Rate</p>
                <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{stats.passRate}%</p>
              </div>
              <div className="bg-white/70 dark:bg-stone-800/70 backdrop-blur-sm rounded-2xl shadow-xl border border-orange-100 dark:border-stone-700 p-6">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Warnings</p>
                <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">{stats.warning}</p>
              </div>
              <div className="bg-white/70 dark:bg-stone-800/70 backdrop-blur-sm rounded-2xl shadow-xl border border-orange-100 dark:border-stone-700 p-6">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Errors</p>
                <p className="text-3xl font-bold text-rose-600 dark:text-rose-400">{stats.error}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white/70 dark:bg-stone-800/70 backdrop-blur-sm rounded-2xl shadow-xl border border-orange-100 dark:border-stone-700 p-6">
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">Validation Breakdown</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600 dark:text-gray-400">Passing</span>
                      <span className="font-medium text-gray-800 dark:text-gray-200">{stats.pass}</span>
                    </div>
                    <div className="h-2 bg-gray-100 dark:bg-stone-700 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${stats.total ? (stats.pass / stats.total) * 100 : 0}%` }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600 dark:text-gray-400">Warnings</span>
                      <span className="font-medium text-gray-800 dark:text-gray-200">{stats.warning}</span>
                    </div>
                    <div className="h-2 bg-gray-100 dark:bg-stone-700 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: `${stats.total ? (stats.warning / stats.total) * 100 : 0}%` }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600 dark:text-gray-400">Errors</span>
                      <span className="font-medium text-gray-800 dark:text-gray-200">{stats.error}</span>
                    </div>
                    <div className="h-2 bg-gray-100 dark:bg-stone-700 rounded-full overflow-hidden">
                      <div className="h-full bg-rose-500 rounded-full" style={{ width: `${stats.total ? (stats.error / stats.total) * 100 : 0}%` }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/70 dark:bg-stone-800/70 backdrop-blur-sm rounded-2xl shadow-xl border border-orange-100 dark:border-stone-700 p-6">
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {items.slice(0, 5).map((item) => (
                    <div key={item.id} className="flex items-center justify-between py-2 border-b border-orange-50 dark:border-stone-700 last:border-0">
                      <div>
                        <p className="font-medium text-gray-800 dark:text-gray-200 text-sm">{item.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{formatDate(item.createdAt)}</p>
                      </div>
                      <span
                        className={cn(
                          "px-2 py-1 rounded-full text-xs font-medium",
                          item.validations.overallStatus === "pass" && "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200",
                          item.validations.overallStatus === "warning" && "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200",
                          item.validations.overallStatus === "error" && "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-200"
                        )}
                      >
                        {item.validations.overallStatus}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="max-w-2xl mx-auto space-y-6 fade-in-up" style={{ "--delay": "0s" } as React.CSSProperties}>
            <div className="bg-white/70 dark:bg-stone-800/70 backdrop-blur-sm rounded-2xl shadow-xl border border-orange-100 dark:border-stone-700 p-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6">Settings</h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-gray-200">Dark Mode</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Toggle between light and dark themes</p>
                  </div>
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className={cn(
                      "w-14 h-8 rounded-full transition-colors relative",
                      darkMode ? "bg-amber-500" : "bg-gray-200 dark:bg-stone-700"
                    )}
                  >
                    <span
                      className={cn(
                        "absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform",
                        darkMode ? "left-7" : "left-1"
                      )}
                    />
                  </button>
                </div>

                <div className="space-y-2">
                  <label className="font-medium text-gray-800 dark:text-gray-200">Display Name</label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-orange-200 dark:border-stone-600 bg-white dark:bg-stone-900 dark:text-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                  />
                </div>

                <div className="pt-4 border-t border-orange-100 dark:border-stone-700">
                  <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Data Export</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Export all your design validation data as JSON</p>
                  <button
                    onClick={handleExport}
                    className="px-6 py-3 bg-gradient-to-r from-amber-500 to-rose-500 text-white font-medium rounded-xl shadow-lg shadow-amber-500/25 hover:from-amber-600 hover:to-rose-600 active:scale-95 transition-all"
                  >
                    Export Data to Clipboard
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}