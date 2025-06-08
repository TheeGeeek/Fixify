interface TechSolution {
  diagnosis: string;
  steps: Array<{
    emoji: string;
    action: string;
  }>;
  encouragement: string;
  voiceOption: string;
  complexIssueGuidance?: string;
  tone: 'friendly' | 'serious';
}

interface ConversationEntry {
  problem: string;
  solution: string;
  timestamp: Date;
}

const solutions: Record<string, TechSolution> = {
  "wifi": {
    diagnosis: "It sounds like you're having WiFi connectivity issues. This is usually caused by router problems, network settings, or interference. Let me walk you through some simple fixes.",
    steps: [
      { emoji: "🔄", action: "Unplug your router from the wall for 30 seconds, then plug it back in and wait 2 minutes for it to fully restart." },
      { emoji: "📶", action: "Check if other devices (like your phone or tablet) can connect to the same WiFi network to see if the problem is with your specific device." },
      { emoji: "🔧", action: "On your device, go to WiFi settings, find your network name, select 'Forget' or 'Remove', then reconnect by entering your WiFi password again." },
      { emoji: "📍", action: "Move closer to your router (within 10 feet) to test if distance or walls are blocking the signal." }
    ],
    encouragement: "WiFi issues are super common and usually easy to fix! If you want, I can read these steps aloud for you. Let me know if this helps 😊",
    voiceOption: "If you want, I can read these steps aloud for you.",
    complexIssueGuidance: "If none of these steps work, there might be a hardware issue with your router or device. For complex network problems, visiting a certified repair center nearby is recommended. Try searching '[your device brand] service center near me' or contact your internet service provider.",
    tone: 'friendly'
  },
  "slow": {
    diagnosis: "A slow computer is often caused by too many programs running at once, not enough storage space, or outdated software. These simple steps should help speed things up.",
    steps: [
      { emoji: "🚀", action: "Click the Start button, then the power icon, and select 'Restart' to clear temporary files and refresh your computer's memory." },
      { emoji: "📱", action: "Look at the bottom right corner of your screen (system tray) and close any programs you're not using by right-clicking their icons and selecting 'Close' or 'Exit'." },
      { emoji: "💾", action: "Type 'Disk Cleanup' in the Start menu search, open it, select your main drive (usually C:), and click 'OK' to remove temporary files and free up storage space." },
      { emoji: "⬆️", action: "Go to Settings > Update & Security > Windows Update and click 'Check for updates' to install any available improvements." }
    ],
    encouragement: "Your computer should feel much snappier after these steps! If you want, I can read these steps aloud for you. Let me know how it goes 😊",
    voiceOption: "If you want, I can read these steps aloud for you.",
    complexIssueGuidance: "If your computer is still very slow after trying these steps, you might need more memory (RAM) or have a failing hard drive. For complex hardware issues, visiting a certified repair center nearby is recommended. Search '[your computer brand] service center near me' for professional help.",
    tone: 'friendly'
  },
  "phone": {
    diagnosis: "📱 Phone freezing and crashing usually happens when there's not enough storage space, too many apps running, or software glitches. Let's try these simple fixes first.",
    steps: [
      { emoji: "🔄", action: "Hold down your phone's power button for 10-15 seconds until the screen goes black, then press it again to turn your phone back on." },
      { emoji: "📱", action: "Double-tap your home button (iPhone) or use the recent apps button (Android) to see all open apps, then swipe up on each app to close them." },
      { emoji: "💾", action: "Go to your Photos app and delete old pictures/videos you don't need, or go to Settings and uninstall apps you rarely use to free up storage space." },
      { emoji: "⬆️", action: "Go to Settings > General > Software Update (iPhone) or Settings > System Update (Android) and install any available updates." }
    ],
    encouragement: "These steps should help stabilize your phone's performance! If you want, I can read these steps aloud for you. I'm here if you need more help 😊",
    voiceOption: "If you want, I can read these steps aloud for you.",
    complexIssueGuidance: "⚠️ If your phone continues to freeze or crash frequently, there might be a hardware problem or corrupted software that requires professional attention. For complex issues, visiting a certified repair center nearby is recommended. Search '[your phone brand] service center near me' to find authorized repair shops.",
    tone: 'serious'
  },
  "screen": {
    diagnosis: "🖥️ Screen flickering or strange colors are typically caused by loose cable connections, outdated display drivers, or incorrect display settings. Let's check these step by step.",
    steps: [
      { emoji: "🔌", action: "Turn off your computer, then check that the cable connecting your monitor is firmly plugged into both your computer and monitor. Unplug and plug it back in securely." },
      { emoji: "🎨", action: "Right-click anywhere on your desktop, select 'Display settings', and make sure the resolution is set to the 'Recommended' option." },
      { emoji: "🔄", action: "Right-click 'This PC', select 'Properties', then 'Device Manager', find 'Display adapters', right-click your graphics card, and select 'Update driver'." },
      { emoji: "🖥️", action: "If possible, connect your computer to a different monitor or TV using the same cable to test if the problem is with your monitor or computer." }
    ],
    encouragement: "Display issues can be tricky, but these steps usually resolve them! If you want, I can read these steps aloud for you. Let me know what happens 😊",
    voiceOption: "If you want, I can read these steps aloud for you.",
    complexIssueGuidance: "⚠️ If the screen problems persist, you might have a failing graphics card or monitor that needs professional diagnosis. For complex display hardware issues, visiting a certified repair center nearby is recommended. Search '[your computer brand] service center near me' for expert help.",
    tone: 'serious'
  },
  "audio": {
    diagnosis: "🔊 No sound from speakers is commonly caused by volume settings being turned off, incorrect audio device selection, or driver issues. Let's check these simple fixes first.",
    steps: [
      { emoji: "🔊", action: "Look at the bottom right corner of your screen for the speaker icon. Click it and make sure the volume slider is up and not muted (no red X or line through it)." },
      { emoji: "🎵", action: "Right-click the speaker icon, select 'Open Sound settings', then under 'Choose your output device', make sure your speakers or headphones are selected." },
      { emoji: "🔄", action: "Press Windows key + R, type 'services.msc', find 'Windows Audio' in the list, right-click it, and select 'Restart', or simply restart your computer." },
      { emoji: "🎧", action: "Plug in headphones or earbuds to test if you can hear sound through them - this helps determine if the problem is with your speakers or computer." }
    ],
    encouragement: "Audio problems are usually quick fixes! If you want, I can read these steps aloud for you. Let me know if you can hear sound now 😊",
    voiceOption: "If you want, I can read these steps aloud for you.",
    complexIssueGuidance: "If you still have no sound after trying these steps, your sound card or speakers might need professional repair. For complex audio hardware issues, visiting a certified repair center nearby is recommended. Search '[your computer brand] service center near me' for technical support.",
    tone: 'friendly'
  },
  "software": {
    diagnosis: "💻 Programs that won't open or keep crashing often have corrupted files, compatibility issues, or need updates. Let's try these troubleshooting steps in order.",
    steps: [
      { emoji: "🔄", action: "Close the program completely (check the system tray), then right-click the program icon and select 'Run as administrator' to give it full permissions." },
      { emoji: "⬆️", action: "Open the program's Help menu and look for 'Check for updates' or visit the software company's website to download the latest version." },
      { emoji: "🔧", action: "Go to Settings > Apps, find your program in the list, click it, and select 'Advanced options' then 'Repair' if available, or uninstall and reinstall the program." },
      { emoji: "🖥️", action: "Restart your computer completely and try opening the program again - this clears memory issues that might be causing crashes." }
    ],
    encouragement: "Software issues can be frustrating, but these steps usually get things working again! If you want, I can read these steps aloud for you. Keep me posted 😊",
    voiceOption: "If you want, I can read these steps aloud for you.",
    complexIssueGuidance: "If the program still won't work properly, there might be deeper system conflicts or compatibility issues that need professional diagnosis. For complex software problems, visiting a certified repair center nearby is recommended. Search '[your computer brand] service center near me' or contact the software company's technical support.",
    tone: 'friendly'
  }
};

function getContextualResponse(problem: string, history: ConversationEntry[]): string {
  if (history.length === 0) return "";
  
  const lastProblem = history[history.length - 1].problem.toLowerCase();
  const currentProblem = problem.toLowerCase();
  
  // Check for follow-up questions
  if (currentProblem.includes("still") || currentProblem.includes("didn't work") || currentProblem.includes("not working")) {
    return "I see the previous solution didn't fully resolve your issue. Let me provide some additional steps. ";
  }
  
  if (currentProblem.includes("now") || currentProblem.includes("next")) {
    return "Great! Since we've been working on this together, here's what to try next. ";
  }
  
  // Check for related issues
  if ((lastProblem.includes("wifi") && currentProblem.includes("internet")) ||
      (lastProblem.includes("slow") && currentProblem.includes("freeze")) ||
      (lastProblem.includes("phone") && currentProblem.includes("app"))) {
    return "I notice this might be related to the issue we discussed earlier. ";
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
      diagnosis: "I understand you're experiencing a technical issue. Here are some general troubleshooting steps that often help resolve common problems. Let's try these simple fixes first.",
      steps: [
        { emoji: "🔄", action: "Restart your device completely by turning it off, waiting 10 seconds, then turning it back on to clear temporary issues." },
        { emoji: "⬆️", action: "Check for updates by going to your device's Settings and looking for 'System Update' or 'Software Update' to install any available fixes." },
        { emoji: "💾", action: "Free up storage space by deleting old files, photos, or apps you don't use anymore - devices need space to work properly." },
        { emoji: "🔍", action: "Try using your device in Safe Mode (search online for '[your device] safe mode') to see if the problem still occurs." }
      ],
      encouragement: "These general steps often resolve many technical issues! If you want, I can read these steps aloud for you. Feel free to describe your problem in more detail if you need specific help 😊",
      voiceOption: "If you want, I can read these steps aloud for you.",
      complexIssueGuidance: "If the problem persists after trying these steps, it might require professional diagnosis. For complex issues, visiting a certified repair center nearby is recommended. Search '[your device brand] service center near me' to find authorized technicians who can help.",
      tone: 'friendly'
    };
  }
  
  // Add contextual awareness
  const contextualPrefix = getContextualResponse(problem, conversationHistory);
  
  // Format the solution with appropriate tone
  let formattedSolution = contextualPrefix + matchedSolution.diagnosis + "\n\n";
  
  matchedSolution.steps.forEach((step, index) => {
    formattedSolution += `${step.emoji} ${index + 1}. ${step.action}\n`;
  });
  
  formattedSolution += `\n${matchedSolution.encouragement}`;
  
  if (matchedSolution.complexIssueGuidance) {
    const guidancePrefix = matchedSolution.tone === 'serious' ? "\n\n⚠️ " : "\n\n💡 ";
    formattedSolution += `${guidancePrefix}${matchedSolution.complexIssueGuidance}`;
  }
  
  return formattedSolution;
}