import heapq
from agents.base_agent import Agent
from models.request import Request
from agents.coordinator import THRESHOLDS

class TrafficSignalAgent(Agent):  # traffic signal agent
    def detect_congestion(self, vehicle_count, log):
        log.append(f"[Traffic] vehicle_count = {vehicle_count}")
        if vehicle_count > THRESHOLDS["TRAFFIC_CONGESTION"]:
            log.append("[Traffic] ⚠️ Congestion detected! Requesting signal timing increase")
            return True
        else:
            log.append("[Traffic] ✓ No congestion detected")
            return False

    def request_coordination(self, coordinator, vehicle_count, log):
        priority = min(10, int(vehicle_count / 10))
        req = Request("REQ-T1", self, priority, "TRAFFIC_CONGESTION")
        self.send_message(coordinator, req, log)

    def receive_message(self, decision, log):
        log.append(f"[Traffic] Decision received: {decision}")
        if decision == "APPROVED":
            log.append("[Traffic] Applying coordinator-approved adjustment")
            log.append("[Traffic] Timer adjusted: Green light extended by 60 seconds")
            log.append("[Traffic] ✓ System stable — no congestion")
