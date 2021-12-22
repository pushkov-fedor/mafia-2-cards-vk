import { HealthStatus } from "../constants";

export default (player) => player.status !== HealthStatus.Dead;
