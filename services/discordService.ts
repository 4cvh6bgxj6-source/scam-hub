
import { SCAMMER_WEBHOOK_URL, SCRIPTER_WEBHOOK_URL } from '../constants';
import { ScamReport } from '../types';

export const sendScamReport = async (report: ScamReport): Promise<boolean> => {
  // Select the correct webhook based on report type
  const webhookUrl = report.isScripterReport ? SCRIPTER_WEBHOOK_URL : SCAMMER_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error("Webhook URL is missing");
    return false;
  }

  // Determine what to show in the "Video Proof" field
  let proofValue = "No evidence attached";
  if (report.proofFile) {
    proofValue = `📁 Video Attached: ${report.proofFile.name}`;
  }

  const titleText = report.isScripterReport ? "🚨 NEW SCRIPTER REPORT 🚨" : "🚨 NEW SCAM REPORT 🚨";
  const descText = report.isScripterReport 
    ? "A new SCRIPTER/HACKER has been reported via the Blacklist Hub." 
    : "A new scam report has been submitted via the Trading Hub.";

  const fields = [
      {
        name: "👮 Reporter (Victim)",
        value: report.reporterName || "Anonymous",
        inline: true
      },
      {
        name: "💬 Discord Contact",
        value: report.discordUsername || "Not provided",
        inline: true
      },
      {
        name: "🚫 Roblox User (Scammer/Scripter)",
        value: report.scammerName,
        inline: true
      },
      {
        name: "📅 Date of Incident",
        value: report.scamDate,
        inline: true
      },
      {
        name: "📝 Description",
        value: report.description
      },
      {
        name: "📺 Video Proof",
        value: proofValue
      },
      {
        name: "🖥️ System Info",
        value: `Platform: ${navigator.platform}`,
        inline: true
      }
  ];

  // Insert script name if present
  if (report.scripterName) {
    fields.splice(3, 0, {
      name: "💻 Script/Hack Name",
      value: report.scripterName,
      inline: true
    });
  }

  const embed = {
    title: titleText,
    description: descText,
    color: report.isScripterReport ? 0 : 16711680, // Black for scripter, Red for scammer
    fields: fields,
    footer: {
      text: `Brainrot Trading Hub Security • ID: ${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      icon_url: "https://cdn-icons-png.flaticon.com/512/4712/4712109.png"
    },
    timestamp: new Date().toISOString()
  };

  const payloadJson = {
    content: report.isScripterReport 
      ? "<@&987654321098765432> New SCRIPTER report! Check evidence."
      : "<@&987654321098765432> New SCAM report! Check video evidence.",
    username: "Anti-Scam Bot",
    avatar_url: "https://cdn-icons-png.flaticon.com/512/9203/9203764.png",
    embeds: [embed]
  };

  try {
    // If a file is attached, we must use FormData
    if (report.proofFile) {
      const formData = new FormData();
      // Discord Webhooks require the JSON payload to be in a field named 'payload_json' when sending files
      formData.append('payload_json', JSON.stringify(payloadJson));
      
      // CRITICAL: Pass the filename as the third argument to ensure Discord recognizes it as a video
      formData.append('file', report.proofFile, report.proofFile.name);

      const response = await fetch(webhookUrl, {
        method: "POST",
        body: formData, // fetch automatically sets the correct Content-Type with boundary for FormData
      });

      if (response.ok) return true;
      console.error("Discord Webhook file upload failed:", response.statusText);
      return false;
    } else {
        console.error("No file provided");
        return false;
    }
  } catch (error) {
    console.error("Error sending webhook:", error);
    return false;
  }
};
