class Request:
    def __init__(self, request_id, source_agent, priority_level, request_type):
        self.request_id = request_id
        self.source_agent = source_agent
        self.priority_level = priority_level
        self.request_type = request_type
        self.decision_status = "PENDING"

    def __str__(self):
        return f"Request(type={self.request_type}, priority={self.priority_level})"
