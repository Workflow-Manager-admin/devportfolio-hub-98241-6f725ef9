import React, { createContext, useContext } from "react";

/**
 * PUBLIC_INTERFACE
 * SectionConfigContext provides runtime customization for section titles, media, layout, and theme options.
 * Use the useSectionConfig() hook to access current config in components.
 */

const SectionConfigContext = createContext({});

export function SectionConfigProvider({ value = {}, children }) {
  // value: an object mapping section keys ("home", "projects", "resume", "contact") to config objects
  return (
    <SectionConfigContext.Provider value={value}>
      {children}
    </SectionConfigContext.Provider>
  );
}

// PUBLIC_INTERFACE
export function useSectionConfig(sectionKey) {
  /**
   * Returns config object for the given sectionKey, falling back to {} if not present.
   * @param {string} sectionKey - "home", "projects", "resume", "contact", etc.
   */
  const context = useContext(SectionConfigContext);
  return context?.[sectionKey] || {};
}
