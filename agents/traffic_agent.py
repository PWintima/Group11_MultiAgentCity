import heapq
from agents.base_agent import Agent
from models.request import Request
from agents.coordinator import THRESHOLDS

class TrafficSignalAgent(Agent):  # traffic signal agent
    def detect_congestion(self, vehicle_count, log):
        log.append(f"[Traffic] vehicle_count = {vehicle_count}")
        return vehicle_count > THRESHOLDS["TRAFFIC_CONGESTION"]

    def request_coordination(self, coordinator, vehicle_count, log):
        priority = min(10, int(vehicle_count / 10))
        req = Request("REQ-T1", self, priority, "TRAFFIC_CONGESTION")
        self.send_message(coordinator, req, log)

    def receive_message(self, decision, log):
        log.append(f"[Traffic] Decision received: {decision}")
        if decision == "APPROVED":
            log.append("[Traffic] Timer adjusted from 1 min → 3 min")
