from agents.base_agent import Agent
from models.request import Request
from agents.coordinator import THRESHOLDS

class PublicTransitAgent(Agent):  # Public transit agent
    def detect_delay(self, delay_minutes, log):
        log.append(f"[Transit] delay = {delay_minutes} minutes")
        if delay_minutes > THRESHOLDS["TRANSIT_DELAY"]:
            log.append("[Transit] ⚠️ Transit delay detected! Requesting coordination...")
            return True
        else:
            log.append("[Transit] ✓ Transit schedule on track")
            return False

    def request_coordination(self, coordinator, delay_minutes, log):
        priority = min(10, int(delay_minutes / 10))
        req = Request("REQ-TX1", self, priority, "TRANSIT_DELAY")
        self.send_message(coordinator, req, log)

    def receive_message(self, decision, log):
        log.append(f"[Transit] Decision received: {decision}")
        if decision == "APPROVED":
            log.append("[Transit] Action: Prioritizing train signal clearance")
            log.append("[Transit] Delay reduced from 15 min → 5 min")
