from spade.agent import Agent
from spade.behaviour import CyclicBehaviour
from spade.message import Message
import json

class CoordinatorAgent(Agent):

    class CoordinatorBehaviour(CyclicBehaviour):
        async def run(self):
            msg = await self.receive(timeout=5)

            if msg:
                data = json.loads(msg.body)

                request_type = data["type"]
                priority = data["priority"]
                sender = str(msg.sender)

                print(f"[Coordinator] Received {request_type} from {sender}")

                # Simple decision rule
                decision = "APPROVED" if priority >= 6 else "DENIED"

                reply = Message(to=sender)
                reply.set_metadata("performative", "inform")
                reply.body = decision

                await self.send(reply)

    async def setup(self):
        print("[Coordinator] Started")
        self.add_behaviour(self.CoordinatorBehaviour())
