

useEffect(() => {
    const handleGlobalMouseDown = (event) => {
      const selection = window.getSelection();

      // Check 1: If the selection has truly been cleared (collapsed)
      // AND Check 2: The click wasn't initiated by a selection action itself
      if (selection.isCollapsed) {
        // If the selection is gone, hide the tooltip
        hideTooltip();
      }
    };

    // Attach listener to the whole document
    document.addEventListener("mousedown", handleGlobalMouseDown);

    return () => {
      // Cleanup: Remove the listener when the provider unmounts
      document.removeEventListener("mousedown", handleGlobalMouseDown);
    };
  }, []);