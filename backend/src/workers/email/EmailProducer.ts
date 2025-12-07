import { emailQueue } from "../Queues.js";

type EmailData = {
  userEmail: string;
  userName: string;
  token: string;
};

export async function SendConfirmEmail(user: EmailData) {
  const job = await emailQueue.add(
    "confirm-mail",
    { timestamp: Date.now(), user },
    { attempts: 5, backoff: { type: "exponential", delay: 3000 } }
  );
  console.log(`[Producer] Added job ${job.id} with param: ${user}`);
  return job.id;
}

export async function SendForgetPassEmail(
  user: Pick<EmailData, "userEmail" | "token">
) {
  const job = await emailQueue.add(
    "forget-pass",
    { timestamp: Date.now(), user },
    { attempts: 5, backoff: { type: "exponential", delay: 3000 } }
  );
  console.log(`[Producer] Added job ${job.id} with param: ${user}`);
  return job.id;
}
