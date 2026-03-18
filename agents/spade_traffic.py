from spade.agent import Agent
from spade.behaviour import OneShotBehaviour, CyclicBehaviour
from spade.message import Message
import json

class TrafficAgent(Agent):

    class SendRequestBehaviour(OneShotBehaviour):
        async def run(self):
            vehicle_count = self.agent.vehicle_count

            if vehicle_count > 50:
                msg = Message(to=self.agent.coordinator_jid)
                msg.set_metadata("performative", "request")

                msg.body = json.dumps({
                    "type": "TRAFFIC_CONGESTION",
                    "priority": min(10, vehicle_count // 10)
                })

                print("[Traffic] Sending congestion request")
                await self.send(msg)

    class ReceiveBehaviour(CyclicBehaviour):
        async def run(self):
            msg = await self.receive(timeout=5)
            if msg:
                print(f"[Traffic] Decision: {msg.body}")

                if msg.body == "APPROVED":
                    print("[Traffic] Timer adjusted from 1 min → 3 min")

    async def setup(self):
        print("[Traffic] Started")
        self.add_behaviour(self.SendRequestBehaviour())
        self.add_behaviour(self.ReceiveBehaviour())
