class Agent:
    def __init__(self, agent_id):
        self.agent_id = agent_id
        self.status = "ACTIVE"

    def send_message(self, receiver, message, log):
        log.append(f"[{self.agent_id}] → Sending request to {receiver.agent_id}")
        receiver.receive_message(message, log)

    def receive_message(self, message, log):
        log.append(f"[{self.agent_id}] ← Received: {message}")
