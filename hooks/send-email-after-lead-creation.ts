import type { CollectionAfterChangeHook } from "payload";

import { getContactMethods } from "@/queries/get-contact-methods";

export const sendEmailAfterLeadCreation: CollectionAfterChangeHook = async ({
  doc,
  req: { payload },
  context,
  operation,
}) => {
  // Skip hook during seeding
  if (context?.isSeeding) {
    return;
  }

  if (operation !== "create") {
    return;
  }

  if (context.isWebSource) {
    try {
      const { emailForNotifications } = await getContactMethods();

      if (!emailForNotifications) {
        return;
      }

      // Do not await the email sending to avoid blocking the hook execution
      payload
        .sendEmail({
          to: emailForNotifications,
          subject: `Nuevo contacto: ${doc.name || "Contact Form"}`,
          text: `Nombre: ${doc.name}\nEmail: ${doc.email}\nTeléfono: ${doc.phone}\nMensaje: ${doc.message || "---"}`,
        })
        .catch((error) => {
          payload.logger.error(
            `Failed to send lead email: ${error instanceof Error ? error.message : "Unknown error"}`
          );
        });
    } catch (error) {
      payload.logger.error(
        `Failed to fetch contact methods for lead email: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  }

  return;
};
