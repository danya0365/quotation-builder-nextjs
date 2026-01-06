/**
 * Quotation Store
 * State management for quotation builder using Zustand
 * Data-driven approach as specified in FEATURE.md
 */

import {
    Feature,
    ProjectType,
    Quotation,
    QuotationItem,
} from '@/src/application/repositories/IFeatureRepository';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface QuotationState {
  // Current quotation
  projectType: ProjectType | null;
  projectName: string;
  clientName: string;
  clientEmail: string;
  selectedFeatureIds: string[];
  items: QuotationItem[];
  discount: number;
  discountPercent: number;
  taxPercent: number;
  notes: string;
  
  // Computed values (stored for performance)
  subtotal: number;
  tax: number;
  total: number;
  
  // UI State
  isLoading: boolean;
  showDependencyWarning: boolean;
  pendingFeature: Feature | null;
  missingDependencies: Feature[];
}

interface QuotationActions {
  // Project setup
  setProjectType: (type: ProjectType) => void;
  setProjectName: (name: string) => void;
  setClientName: (name: string) => void;
  setClientEmail: (email: string) => void;
  
  // Feature selection
  addFeature: (feature: Feature) => void;
  removeFeature: (featureId: string) => void;
  toggleFeature: (feature: Feature, allFeatures: Feature[]) => void;
  isFeatureSelected: (featureId: string) => boolean;
  
  // Dependency handling
  addFeatureWithDependencies: (feature: Feature, dependencies: Feature[]) => void;
  dismissDependencyWarning: () => void;
  
  // Pricing
  setDiscount: (amount: number) => void;
  setDiscountPercent: (percent: number) => void;
  setTaxPercent: (percent: number) => void;
  recalculateTotals: () => void;
  
  // Quotation management
  setNotes: (notes: string) => void;
  resetQuotation: () => void;
  loadQuotation: (quotation: Partial<QuotationState>) => void;
  exportQuotation: () => Quotation;
  
  // Loading state
  setLoading: (loading: boolean) => void;
}

type QuotationStore = QuotationState & QuotationActions;

const initialState: QuotationState = {
  projectType: null,
  projectName: '',
  clientName: '',
  clientEmail: '',
  selectedFeatureIds: [],
  items: [],
  discount: 0,
  discountPercent: 0,
  taxPercent: 7, // Default Thai VAT
  notes: '',
  subtotal: 0,
  tax: 0,
  total: 0,
  isLoading: false,
  showDependencyWarning: false,
  pendingFeature: null,
  missingDependencies: [],
};

export const useQuotationStore = create<QuotationStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      // Project setup
      setProjectType: (type) => set({ projectType: type }),
      setProjectName: (name) => set({ projectName: name }),
      setClientName: (name) => set({ clientName: name }),
      setClientEmail: (email) => set({ clientEmail: email }),

      // Feature selection
      addFeature: (feature) => {
        const state = get();
        if (state.selectedFeatureIds.includes(feature.id)) return;

        const newItem: QuotationItem = {
          featureId: feature.id,
          feature,
          quantity: 1,
          subtotal: feature.price,
        };

        const newItems = [...state.items, newItem];
        const newSelectedIds = [...state.selectedFeatureIds, feature.id];
        const newSubtotal = newItems.reduce((sum, item) => sum + item.subtotal, 0);
        const discountAmount = state.discountPercent > 0 
          ? (newSubtotal * state.discountPercent / 100) 
          : state.discount;
        const afterDiscount = newSubtotal - discountAmount;
        const newTax = afterDiscount * state.taxPercent / 100;
        const newTotal = afterDiscount + newTax;

        set({
          items: newItems,
          selectedFeatureIds: newSelectedIds,
          subtotal: newSubtotal,
          discount: discountAmount,
          tax: newTax,
          total: newTotal,
        });
      },

      removeFeature: (featureId) => {
        const state = get();
        const newItems = state.items.filter((item) => item.featureId !== featureId);
        const newSelectedIds = state.selectedFeatureIds.filter((id) => id !== featureId);
        const newSubtotal = newItems.reduce((sum, item) => sum + item.subtotal, 0);
        const discountAmount = state.discountPercent > 0 
          ? (newSubtotal * state.discountPercent / 100) 
          : state.discount;
        const afterDiscount = newSubtotal - discountAmount;
        const newTax = afterDiscount * state.taxPercent / 100;
        const newTotal = afterDiscount + newTax;

        set({
          items: newItems,
          selectedFeatureIds: newSelectedIds,
          subtotal: newSubtotal,
          discount: discountAmount,
          tax: newTax,
          total: newTotal,
        });
      },

      toggleFeature: (feature, allFeatures) => {
        const state = get();
        const isSelected = state.selectedFeatureIds.includes(feature.id);

        if (isSelected) {
          // Check if any other selected feature depends on this one
          const dependentFeatures = allFeatures.filter(
            (f) => 
              state.selectedFeatureIds.includes(f.id) && 
              f.dependencies?.includes(feature.id)
          );

          if (dependentFeatures.length > 0) {
            // Remove dependent features first
            dependentFeatures.forEach((df) => get().removeFeature(df.id));
          }
          
          get().removeFeature(feature.id);
        } else {
          // Check dependencies
          if (feature.dependencies && feature.dependencies.length > 0) {
            const missingDeps = feature.dependencies
              .filter((depId) => !state.selectedFeatureIds.includes(depId))
              .map((depId) => allFeatures.find((f) => f.id === depId))
              .filter((f): f is Feature => f !== undefined);

            if (missingDeps.length > 0) {
              set({
                showDependencyWarning: true,
                pendingFeature: feature,
                missingDependencies: missingDeps,
              });
              return;
            }
          }
          get().addFeature(feature);
        }
      },

      isFeatureSelected: (featureId) => {
        return get().selectedFeatureIds.includes(featureId);
      },

      // Dependency handling
      addFeatureWithDependencies: (feature, dependencies) => {
        const state = get();
        
        // Add all missing dependencies first
        dependencies.forEach((dep) => {
          if (!state.selectedFeatureIds.includes(dep.id)) {
            get().addFeature(dep);
          }
        });
        
        // Then add the feature
        get().addFeature(feature);
        
        set({
          showDependencyWarning: false,
          pendingFeature: null,
          missingDependencies: [],
        });
      },

      dismissDependencyWarning: () => {
        set({
          showDependencyWarning: false,
          pendingFeature: null,
          missingDependencies: [],
        });
      },

      // Pricing
      setDiscount: (amount) => {
        set({ discount: amount, discountPercent: 0 });
        get().recalculateTotals();
      },

      setDiscountPercent: (percent) => {
        set({ discountPercent: percent });
        get().recalculateTotals();
      },

      setTaxPercent: (percent) => {
        set({ taxPercent: percent });
        get().recalculateTotals();
      },

      recalculateTotals: () => {
        const state = get();
        const subtotal = state.items.reduce((sum, item) => sum + item.subtotal, 0);
        const discountAmount = state.discountPercent > 0 
          ? (subtotal * state.discountPercent / 100) 
          : state.discount;
        const afterDiscount = subtotal - discountAmount;
        const tax = afterDiscount * state.taxPercent / 100;
        const total = afterDiscount + tax;

        set({
          subtotal,
          discount: discountAmount,
          tax,
          total,
        });
      },

      // Quotation management
      setNotes: (notes) => set({ notes }),

      resetQuotation: () => set(initialState),

      loadQuotation: (quotation) => set({ ...quotation }),

      exportQuotation: () => {
        const state = get();
        return {
          id: `QT-${Date.now()}`,
          projectType: state.projectType!,
          projectName: state.projectName,
          clientName: state.clientName,
          clientEmail: state.clientEmail,
          items: state.items,
          subtotal: state.subtotal,
          discount: state.discount,
          discountPercent: state.discountPercent,
          tax: state.tax,
          taxPercent: state.taxPercent,
          total: state.total,
          notes: state.notes,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
      },

      setLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: 'quotation-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        projectType: state.projectType,
        projectName: state.projectName,
        clientName: state.clientName,
        clientEmail: state.clientEmail,
        selectedFeatureIds: state.selectedFeatureIds,
        items: state.items,
        discount: state.discount,
        discountPercent: state.discountPercent,
        taxPercent: state.taxPercent,
        notes: state.notes,
        subtotal: state.subtotal,
        tax: state.tax,
        total: state.total,
      }),
    }
  )
);

// Selector hooks for performance
export const useProjectType = () => useQuotationStore((s) => s.projectType);
export const useSelectedFeatures = () => useQuotationStore((s) => s.items);
export const useQuotationTotal = () => useQuotationStore((s) => ({
  subtotal: s.subtotal,
  discount: s.discount,
  tax: s.tax,
  total: s.total,
}));
