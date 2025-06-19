interface TechSolution {
  diagnosis: string;
  steps: Array<{
    emoji: string;
    action: string;
    uiPath?: string;
    visualCue?: string;
    officialLink?: string;
  }>;
  encouragement: string;
  voiceOption: string;
  complexIssueGuidance?: string;
  tone: 'friendly' | 'serious';
  officialResources?: Array<{
    platform: string;
    title: string;
    url: string;
  }>;
}

interface ConversationEntry {
  problem: string;
  solution: string;
  timestamp: Date;
}

const solutions: Record<string, TechSolution> = {
  "wifi": {
    diagnosis: "It sounds like you're having WiFi connectivity issues. This is usually caused by router problems, network settings, or interference. Let me walk you through some simple fixes with clear visual guidance.",
    steps: [
      { 
        emoji: "🔄", 
        action: "Unplug your router from the wall for 30 seconds, then plug it back in and wait 2 minutes for it to fully restart.",
        visualCue: "Look for the power LED on your router - it should go from blinking to solid when ready"
      },
      { 
        emoji: "📶", 
        action: "Check if other devices (like your phone or tablet) can connect to the same WiFi network to see if the problem is with your specific device.",
        uiPath: "Phone: Settings → WiFi | Computer: System Tray → WiFi Icon",
        visualCue: "Look for your network name in the available networks list"
      },
      { 
        emoji: "🔧", 
        action: "On your device, go to WiFi settings, find your network name, select 'Forget' or 'Remove', then reconnect by entering your WiFi password again.",
        uiPath: "Windows: Settings → Network & Internet → WiFi → Manage known networks | Mac: System Preferences → Network → WiFi → Advanced | iPhone: Settings → WiFi → (i) next to network → Forget | Android: Settings → WiFi → Saved networks",
        visualCue: "Look for a gear icon or 'i' symbol next to your network name"
      },
      { 
        emoji: "📍", 
        action: "Move closer to your router (within 10 feet) to test if distance or walls are blocking the signal.",
        visualCue: "Check your WiFi signal strength bars - they should increase as you get closer"
      }
    ],
    encouragement: "WiFi issues are super common and usually easy to fix! If you want, I can read these steps aloud for you. Let me know if this helps 😊",
    voiceOption: "If you want, I can read these steps aloud for you.",
    complexIssueGuidance: "If none of these steps work, there might be a hardware issue with your router or device. For complex network problems, visiting a certified repair center nearby is recommended. Try searching '[your device brand] service center near me' or contact your internet service provider.",
    tone: 'friendly',
    officialResources: [
      {
        platform: "Windows",
        title: "Fix WiFi Connection Problems",
        url: "https://support.microsoft.com/en-us/windows/fix-wi-fi-connection-issues-in-windows-9424a1f7-6a3b-65a6-4d78-7f07eee84d2c"
      },
      {
        platform: "Apple",
        title: "Connect to WiFi on Mac",
        url: "https://support.apple.com/guide/mac-help/connect-to-wi-fi-mchlp1557/mac"
      },
      {
        platform: "Android",
        title: "Connect to WiFi Networks",
        url: "https://support.google.com/android/answer/9075847"
      }
    ]
  },
  "slow": {
    diagnosis: "A slow computer is often caused by too many programs running at once, not enough storage space, or outdated software. These simple steps should help speed things up with clear visual guidance.",
    steps: [
      { 
        emoji: "🚀", 
        action: "Restart your computer to clear temporary files and refresh your computer's memory.",
        uiPath: "Windows: Start Menu → Power → Restart | Mac: Apple Menu → Restart",
        visualCue: "Look for the power icon in the Start menu or Apple logo in the top-left corner"
      },
      { 
        emoji: "📱", 
        action: "Close unnecessary programs running in the background.",
        uiPath: "Windows: Ctrl + Shift + Esc → Processes tab | Mac: Cmd + Space → Activity Monitor",
        visualCue: "Look for programs using high CPU or Memory percentages - right-click to end task",
        officialLink: "https://support.microsoft.com/en-us/windows/task-manager-1a4b8d3e-7a7b-4b7a-8b7a-1a4b8d3e7a7b"
      },
      { 
        emoji: "💾", 
        action: "Free up storage space using built-in cleanup tools.",
        uiPath: "Windows: Start Menu → type 'Disk Cleanup' → Select C: drive | Mac: Apple Menu → About This Mac → Storage → Manage",
        visualCue: "Look for checkboxes next to file types you can safely delete (Temporary files, Recycle Bin, etc.)"
      },
      { 
        emoji: "⬆️", 
        action: "Install available system updates.",
        uiPath: "Windows: Settings → Update & Security → Windows Update | Mac: System Preferences → Software Update",
        visualCue: "Look for a blue 'Check for updates' button or notification badges"
      }
    ],
    encouragement: "Your computer should feel much snappier after these steps! If you want, I can read these steps aloud for you. Let me know how it goes 😊",
    voiceOption: "If you want, I can read these steps aloud for you.",
    complexIssueGuidance: "If your computer is still very slow after trying these steps, you might need more memory (RAM) or have a failing hard drive. For complex hardware issues, visiting a certified repair center nearby is recommended. Search '[your computer brand] service center near me' for professional help.",
    tone: 'friendly',
    officialResources: [
      {
        platform: "Windows",
        title: "Tips to Improve PC Performance",
        url: "https://support.microsoft.com/en-us/windows/tips-to-improve-pc-performance-in-windows-b3b3ef5b-5953-fb6a-2528-4bbed82fba96"
      },
      {
        platform: "Apple",
        title: "Optimize Storage on Mac",
        url: "https://support.apple.com/guide/mac-help/optimize-storage-space-mh40262/mac"
      }
    ]
  },
  "phone": {
    diagnosis: "📱 Phone freezing and crashing usually happens when there's not enough storage space, too many apps running, or software glitches. Let's try these simple fixes with clear visual guidance.",
    steps: [
      { 
        emoji: "🔄", 
        action: "Force restart your phone to clear temporary glitches.",
        uiPath: "iPhone: Hold Side + Volume Down for 10 seconds | Android: Hold Power button for 10-15 seconds",
        visualCue: "Keep holding until you see the Apple logo (iPhone) or the phone completely turns off and restarts"
      },
      { 
        emoji: "📱", 
        action: "Close all background apps that might be using too much memory.",
        uiPath: "iPhone: Swipe up from bottom → Swipe up on each app | Android: Recent Apps button → Swipe away apps",
        visualCue: "Look for the app switcher view showing all open apps as cards you can swipe away"
      },
      { 
        emoji: "💾", 
        action: "Free up storage space by removing unnecessary files and apps.",
        uiPath: "iPhone: Settings → General → iPhone Storage | Android: Settings → Storage → Free up space",
        visualCue: "Look for a storage bar showing how much space is used - aim for at least 1GB free space",
        officialLink: "https://support.apple.com/en-us/HT211686"
      },
      { 
        emoji: "⬆️", 
        action: "Install the latest software updates for bug fixes and performance improvements.",
        uiPath: "iPhone: Settings → General → Software Update | Android: Settings → System → System Update",
        visualCue: "Look for a red notification badge on Settings or a 'Download and Install' button"
      }
    ],
    encouragement: "These steps should help stabilize your phone's performance! If you want, I can read these steps aloud for you. I'm here if you need more help 😊",
    voiceOption: "If you want, I can read these steps aloud for you.",
    complexIssueGuidance: "⚠️ If your phone continues to freeze or crash frequently, there might be a hardware problem or corrupted software that requires professional attention. For complex issues, visiting a certified repair center nearby is recommended. Search '[your phone brand] service center near me' to find authorized repair shops.",
    tone: 'serious',
    officialResources: [
      {
        platform: "Apple",
        title: "If Your iPhone Keeps Crashing",
        url: "https://support.apple.com/en-us/HT201412"
      },
      {
        platform: "Samsung",
        title: "Galaxy Phone Troubleshooting",
        url: "https://www.samsung.com/us/support/troubleshooting/TSG01001/"
      },
      {
        platform: "Google",
        title: "Fix Android Phone Issues",
        url: "https://support.google.com/android/answer/7668250"
      }
    ]
  },
  "screen": {
    diagnosis: "🖥️ Screen flickering or strange colors are typically caused by loose cable connections, outdated display drivers, or incorrect display settings. Let's check these step by step with visual guidance.",
    steps: [
      { 
        emoji: "🔌", 
        action: "Check and reseat all display cable connections.",
        visualCue: "Look for HDMI, DisplayPort, or VGA cables - they should click firmly into place with no loose wiggling"
      },
      { 
        emoji: "🎨", 
        action: "Verify your display resolution and refresh rate settings.",
        uiPath: "Windows: Right-click Desktop → Display Settings → Advanced Display | Mac: System Preferences → Displays → Display tab",
        visualCue: "Look for 'Recommended' next to the resolution setting - this is usually the best choice"
      },
      { 
        emoji: "🔄", 
        action: "Update your graphics drivers to the latest version.",
        uiPath: "Windows: Right-click Start → Device Manager → Display Adapters → Right-click graphics card → Update driver",
        visualCue: "Look for your graphics card name (NVIDIA, AMD, Intel) and right-click for the context menu"
      },
      { 
        emoji: "🖥️", 
        action: "Test with a different monitor or cable to isolate the problem.",
        visualCue: "If the problem follows the monitor, it's a monitor issue. If it stays with the computer, it's a graphics card issue"
      }
    ],
    encouragement: "Display issues can be tricky, but these steps usually resolve them! If you want, I can read these steps aloud for you. Let me know what happens 😊",
    voiceOption: "If you want, I can read these steps aloud for you.",
    complexIssueGuidance: "⚠️ If the screen problems persist, you might have a failing graphics card or monitor that needs professional diagnosis. For complex display hardware issues, visiting a certified repair center nearby is recommended. Search '[your computer brand] service center near me' for expert help.",
    tone: 'serious',
    officialResources: [
      {
        platform: "Windows",
        title: "Fix Screen Flickering in Windows",
        url: "https://support.microsoft.com/en-us/windows/fix-screen-flickering-in-windows-10-or-windows-11-a3b8b5b3-7b7a-4b7a-8b7a-1a4b8d3e7a7b"
      },
      {
        platform: "Apple",
        title: "Mac Display Issues",
        url: "https://support.apple.com/guide/mac-help/if-your-display-doesnt-look-right-mchlp2650/mac"
      }
    ]
  },
  "audio": {
    diagnosis: "🔊 No sound from speakers is commonly caused by volume settings being turned off, incorrect audio device selection, or driver issues. Let's check these simple fixes with clear visual guidance.",
    steps: [
      { 
        emoji: "🔊", 
        action: "Check your system volume and mute settings.",
        uiPath: "Windows: Click speaker icon in system tray | Mac: Click volume icon in menu bar",
        visualCue: "Look for a speaker icon with an X (muted) or low volume slider - adjust accordingly"
      },
      { 
        emoji: "🎵", 
        action: "Verify the correct audio output device is selected.",
        uiPath: "Windows: Right-click speaker icon → Open Sound Settings → Choose output device | Mac: System Preferences → Sound → Output tab",
        visualCue: "Look for your speakers or headphones in the device list - they should have a green checkmark or be highlighted"
      },
      { 
        emoji: "🔄", 
        action: "Restart the Windows Audio service or restart your computer.",
        uiPath: "Windows: Win + R → type 'services.msc' → Find 'Windows Audio' → Right-click → Restart",
        visualCue: "Look for 'Windows Audio' in the alphabetical list - it should show 'Running' in the Status column"
      },
      { 
        emoji: "🎧", 
        action: "Test with headphones or earbuds to determine if the issue is with speakers or the computer.",
        visualCue: "If headphones work but speakers don't, the problem is likely with the speakers or their connection"
      }
    ],
    encouragement: "Audio problems are usually quick fixes! If you want, I can read these steps aloud for you. Let me know if you can hear sound now 😊",
    voiceOption: "If you want, I can read these steps aloud for you.",
    complexIssueGuidance: "If you still have no sound after trying these steps, your sound card or speakers might need professional repair. For complex audio hardware issues, visiting a certified repair center nearby is recommended. Search '[your computer brand] service center near me' for technical support.",
    tone: 'friendly',
    officialResources: [
      {
        platform: "Windows",
        title: "Fix Sound Problems in Windows",
        url: "https://support.microsoft.com/en-us/windows/fix-sound-problems-in-windows-10-73025246-b61c-40fb-671a-2fcb4a4a1cd5"
      },
      {
        platform: "Apple",
        title: "Mac Sound Issues",
        url: "https://support.apple.com/guide/mac-help/if-the-sound-from-your-mac-isnt-working-mh40897/mac"
      }
    ]
  },
  "software": {
    diagnosis: "💻 Programs that won't open or keep crashing often have corrupted files, compatibility issues, or need updates. Let's try these troubleshooting steps with clear visual guidance.",
    steps: [
      { 
        emoji: "🔄", 
        action: "Run the program with administrator privileges.",
        uiPath: "Windows: Right-click program icon → Run as administrator | Mac: Applications folder → Right-click app → Get Info → check 'Run as administrator'",
        visualCue: "Look for a shield icon next to 'Run as administrator' in the context menu"
      },
      { 
        emoji: "⬆️", 
        action: "Check for and install program updates.",
        uiPath: "Program Menu → Help → Check for Updates or visit the software company's website",
        visualCue: "Look for 'Help', 'About', or gear icon menus within the program"
      },
      { 
        emoji: "🔧", 
        action: "Repair or reinstall the program.",
        uiPath: "Windows: Settings → Apps → Find program → Advanced Options → Repair | Mac: Drag app to Trash → Reinstall from App Store or website",
        visualCue: "Look for 'Modify', 'Repair', or 'Uninstall' options when you click on the program"
      },
      { 
        emoji: "🖥️", 
        action: "Restart your computer completely and try opening the program again.",
        visualCue: "This clears memory issues and resets system processes that might be interfering"
      }
    ],
    encouragement: "Software issues can be frustrating, but these steps usually get things working again! If you want, I can read these steps aloud for you. Keep me posted 😊",
    voiceOption: "If you want, I can read these steps aloud for you.",
    complexIssueGuidance: "If the program still won't work properly, there might be deeper system conflicts or compatibility issues that need professional diagnosis. For complex software problems, visiting a certified repair center nearby is recommended. Search '[your computer brand] service center near me' or contact the software company's technical support.",
    tone: 'friendly',
    officialResources: [
      {
        platform: "Windows",
        title: "Fix App Problems in Windows",
        url: "https://support.microsoft.com/en-us/windows/fix-problems-with-apps-from-microsoft-store-93ed0bcf-9c12-3df6-6dda-92ec5d0415ac"
      },
      {
        platform: "Apple",
        title: "Mac App Troubleshooting",
        url: "https://support.apple.com/guide/mac-help/if-an-app-doesnt-work-as-expected-mchla7b3d1c/mac"
      }
    ]
  }
};

function getContextualResponse(problem: string, history: ConversationEntry[]): string {
  if (history.length === 0) return "";
  
  const lastProblem = history[history.length - 1].problem.toLowerCase();
  const currentProblem = problem.toLowerCase();
  
  // Check for follow-up questions
  if (currentProblem.includes("still") || currentProblem.includes("didn't work") || currentProblem.includes("not working")) {
    return "I see the previous solution didn't fully resolve your issue. Let me provide some additional steps with more detailed visual guidance. ";
  }
  
  if (currentProblem.includes("now") || currentProblem.includes("next")) {
    return "Great! Since we've been working on this together, here's what to try next with clear visual cues. ";
  }
  
  // Check for related issues
  if ((lastProblem.includes("wifi") && currentProblem.includes("internet")) ||
      (lastProblem.includes("slow") && currentProblem.includes("freeze")) ||
      (lastProblem.includes("phone") && currentProblem.includes("app"))) {
    return "I notice this might be related to the issue we discussed earlier. Here's a more targeted approach. ";
  }
  
  return "";
}

export function generateSolution(problem: string, conversationHistory: ConversationEntry[] = []): string {
  const lowerProblem = problem.toLowerCase();
  
  let matchedSolution: TechSolution | null = null;
  
  // Simple keyword matching with better emoji context
  if (lowerProblem.includes('wifi') || lowerProblem.includes('internet') || lowerProblem.includes('connection')) {
    matchedSolution = solutions.wifi;
  } else if (lowerProblem.includes('slow') || lowerProblem.includes('sluggish') || lowerProblem.includes('lag')) {
    matchedSolution = solutions.slow;
  } else if (lowerProblem.includes('phone') || lowerProblem.includes('mobile') || lowerProblem.includes('freeze') || lowerProblem.includes('crash')) {
    matchedSolution = solutions.phone;
  } else if (lowerProblem.includes('screen') || lowerProblem.includes('display') || lowerProblem.includes('monitor') || lowerProblem.includes('flicker')) {
    matchedSolution = solutions.screen;
  } else if (lowerProblem.includes('sound') || lowerProblem.includes('audio') || lowerProblem.includes('speaker') || lowerProblem.includes('volume')) {
    matchedSolution = solutions.audio;
  } else if (lowerProblem.includes('program') || lowerProblem.includes('software') || lowerProblem.includes('app') || lowerProblem.includes('application')) {
    matchedSolution = solutions.software;
  }
  
  // Default fallback solution
  if (!matchedSolution) {
    matchedSolution = {
      diagnosis: "I understand you're experiencing a technical issue. Here are some general troubleshooting steps with clear visual guidance that often help resolve common problems.",
      steps: [
        { 
          emoji: "🔄", 
          action: "Restart your device completely by turning it off, waiting 10 seconds, then turning it back on to clear temporary issues.",
          visualCue: "Wait for all lights to turn off completely before turning back on"
        },
        { 
          emoji: "⬆️", 
          action: "Check for updates by going to your device's Settings and looking for 'System Update' or 'Software Update'.",
          uiPath: "Settings → System → Update (varies by device)",
          visualCue: "Look for notification badges or 'Update Available' messages"
        },
        { 
          emoji: "💾", 
          action: "Free up storage space by deleting old files, photos, or apps you don't use anymore.",
          visualCue: "Aim for at least 10-15% free space on your device for optimal performance"
        },
        { 
          emoji: "🔍", 
          action: "Try using your device in Safe Mode to see if the problem still occurs.",
          uiPath: "Search online for '[your device] safe mode' for specific instructions",
          visualCue: "Safe Mode usually shows 'Safe Mode' text in the corner of your screen"
        }
      ],
      encouragement: "These general steps often resolve many technical issues! If you want, I can read these steps aloud for you. Feel free to describe your problem in more detail if you need specific help 😊",
      voiceOption: "If you want, I can read these steps aloud for you.",
      complexIssueGuidance: "If the problem persists after trying these steps, it might require professional diagnosis. For complex issues, visiting a certified repair center nearby is recommended. Search '[your device brand] service center near me' to find authorized technicians who can help.",
      tone: 'friendly'
    };
  }
  
  // Add contextual awareness
  const contextualPrefix = getContextualResponse(problem, conversationHistory);
  
  // Format the solution with appropriate tone and enhanced visual guidance
  let formattedSolution = contextualPrefix + matchedSolution.diagnosis + "\n\n";
  
  matchedSolution.steps.forEach((step, index) => {
    formattedSolution += `${step.emoji} Step ${index + 1}: ${step.action}\n`;
    
    if (step.uiPath) {
      formattedSolution += `   📍 Navigation: ${step.uiPath}\n`;
    }
    
    if (step.visualCue) {
      formattedSolution += `   👀 What to look for: ${step.visualCue}\n`;
    }
    
    if (step.officialLink) {
      formattedSolution += `   🔗 Official Guide: ${step.officialLink}\n`;
    }
    
    formattedSolution += "\n";
  });
  
  formattedSolution += `${matchedSolution.encouragement}`;
  
  // Add official resources if available
  if (matchedSolution.officialResources && matchedSolution.officialResources.length > 0) {
    formattedSolution += "\n\n📚 Official Resources:\n";
    matchedSolution.officialResources.forEach(resource => {
      formattedSolution += `• ${resource.platform}: [${resource.title}](${resource.url})\n`;
    });
  }
  
  if (matchedSolution.complexIssueGuidance) {
    const guidancePrefix = matchedSolution.tone === 'serious' ? "\n\n⚠️ Important: " : "\n\n💡 Additional Help: ";
    formattedSolution += `${guidancePrefix}${matchedSolution.complexIssueGuidance}`;
  }
  
  return formattedSolution;
}