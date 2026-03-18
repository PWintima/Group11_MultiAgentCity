def run_simulation(traffic, energy, env, transit, coordinator, inputs, log):
    log.append("===== SIMULATION START =====")

    if traffic.detect_congestion(inputs["traffic"], log):
        traffic.request_coordination(coordinator, inputs["traffic"], log)

    if energy.detect_peak_load(inputs["energy"], log):
        energy.request_coordination(coordinator, inputs["energy"], log)

    if env.detect_pollution(inputs["env"], log):
        env.request_coordination(coordinator, inputs["env"], log)

    if transit.detect_delay(inputs["transit"], log):
        transit.request_coordination(coordinator, inputs["transit"], log)

    log.append("===== SIMULATION END =====")
