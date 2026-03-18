import asyncio
from agents.spade_coordinator import CoordinatorAgent
from agents.spade_traffic import TrafficAgent

async def main():

    # Replace with your XMPP credentials
    coordinator = CoordinatorAgent("coordinator@jabber.at", "password")
    traffic = TrafficAgent("traffic@jabber.at", "password")

    # pass data
    traffic.vehicle_count = 70
    traffic.coordinator_jid = "coordinator@jabber.at"

    await coordinator.start()
    await traffic.start()

    await asyncio.sleep(10)

    await coordinator.stop()
    await traffic.stop()

asyncio.run(main())
