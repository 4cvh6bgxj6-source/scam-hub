import { DISCORD_WEBHOOK_URL } from '../constants';
import { ScamReport } from '../types';

export const sendScamReport = async (report: ScamReport): Promise<boolean> => {
  if (!DISCORD_WEBHOOK_URL) {
    console.error("Webhook URL is missing");
    return false;
  }

  // Determine what to show in the "Video Proof" field
  let proofValue = "No evidence attached";
  if (report.proofFile) {
    proofValue = "📁 See attached video file";
  }

  const embed = {
    title: "🚨 NEW ANTI-SCAM TICKET 🚨",
    description: "A new scam report has been submitted via the Trading Hub.",
    color: 16711680, // Red color
    fields: [
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
        name: "🚫 Roblox Scammer",
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
      }
    ],
    footer: {
      text: "Brainrot Trading Hub Security System",
      icon_url: "https://cdn-icons-png.flaticon.com/512/4712/4712109.png"
    },
    timestamp: new Date().toISOString()
  };

  const payloadJson = {
    content: "<@&987654321098765432> New report received! Check video evidence.",
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
      formData.append('file', report.proofFile);

      const response = await fetch(DISCORD_WEBHOOK_URL, {
        method: "POST",
        body: formData, // fetch automatically sets the correct Content-Type with boundary for FormData
      });

      if (response.ok) return true;
      console.error("Discord Webhook file upload failed:", response.statusText);
      return false;
    } else {
        // Technically shouldn't happen based on validation, but fall back just in case
        console.error("No file provided");
        return false;
    }
  } catch (error) {
    console.error("Error sending webhook:", error);
    return false;
  }
};