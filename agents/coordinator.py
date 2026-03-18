import heapq
from agents.base_agent import Agent
from models.request import Request

# Global Configurations (could be in a config file)
THRESHOLDS = {
    "TRAFFIC_CONGESTION": 50,
    "PEAK_LOAD": 80,
    "HIGH_POLLUTION": 100,
    "TRANSIT_DELAY": 10
}

PRIORITY_LEVELS = {
    "TRAFFIC_CONGESTION": 7,
    "PEAK_LOAD": 6,
    "HIGH_POLLUTION": 8,
    "TRANSIT_DELAY": 6
}

DEPENDENCIES = {
    "TRAFFIC_CONGESTION": ["ENERGY"],
    "PEAK_LOAD": [],
    "HIGH_POLLUTION": ["TRAFFIC"],
    "TRANSIT_DELAY": ["TRAFFIC", "ENERGY"]
}

class ResourceCoordinationAgent(Agent):
    def __init__(self, agent_id):
        super().__init__(agent_id)
        self.request_queue = []

    def receive_message(self, request, log):
        log.append(f"[Coordinator] Received {request}")

        # push into priority queue (higher priority first)
        heapq.heappush(self.request_queue, (-request.priority_level, request))

        self.process_queue(log)

    def process_queue(self, log):
        while self.request_queue:
            _, request = heapq.heappop(self.request_queue)

            log.append(f"[Coordinator] Processing {request}")

            decision = self.evaluate_conflict(request, log)
            self.send_decision(request.source_agent, decision, log)

    def evaluate_conflict(self, request, log):
        deps = DEPENDENCIES.get(request.request_type, [])

        if deps:
            log.append(f"[Coordinator] Checking dependencies: {deps}")

        # Example logic
        if request.request_type == "TRANSIT_DELAY":
            log.append("[Coordinator] Coordinating with Traffic + Energy")
            log.append("[Traffic] Reducing congestion for train priority")
            log.append("[Energy] Allocating power to rail system")

        if request.request_type == "HIGH_POLLUTION":
            log.append("[Coordinator] Requesting Traffic Agent to reduce flow")

        if request.priority_level >= 6:
            request.decision_status = "APPROVED"
        else:
            request.decision_status = "DENIED"

        return request.decision_status

    def send_decision(self, target_agent, decision, log):
        log.append(f"[Coordinator] Decision: {decision}")
        target_agent.receive_message(decision, log)
