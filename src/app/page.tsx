import { cacheLife, cacheTag } from "next/cache";

type PlayerStats = {
  nombre: string;
  jugados: number;
  ganados: number;
  empatados: number;
  perdidos: number;
  puntos: number;
  estado: string;
};

type Match = {
  jugador1Equipo1: string;
  jugador2Equipo1: string;
  jugador3Equipo1: string;
  jugador4Equipo1: string;
  jugador5Equipo1: string;
  jugador1Equipo2: string;
  jugador2Equipo2: string;
  jugador3Equipo2: string;
  jugador4Equipo2: string;
  jugador5Equipo2: string;
  fecha: string;
  ganador: string;
  fechaNumero: string;
};

function formatNumber(num: number): string {
  return num % 1 === 0 ? num.toString() : num.toFixed(1);
}

async function fetchPlayerStats(): Promise<PlayerStats[]> {
  const url =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSDltLEid06nepxJE3_0v7McOqSbhOqkrSJKd5KWBzGWB2DHWouTS1bE5TCSjREZ8xJHAIn_lMhMrwh/pub?gid=1418425775&single=true&output=csv";

  const res = await fetch(url);
  const text = await res.text();
  const lines = text.trim().split("\n");
  return lines.slice(1).map((line) => {
    const [nombre, jugados, ganados, empatados, perdidos, puntos, estado] =
      line.split(",");
    return {
      nombre: nombre?.trim() || "",
      jugados: parseFloat(jugados) || 0,
      ganados: parseFloat(ganados) || 0,
      empatados: parseFloat(empatados) || 0,
      perdidos: parseFloat(perdidos) || 0,
      puntos: parseFloat(puntos) || 0,
      estado: estado?.trim() || "",
    } satisfies PlayerStats;
  });
}

async function fetchMatches(): Promise<Match[]> {
  const url =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSDltLEid06nepxJE3_0v7McOqSbhOqkrSJKd5KWBzGWB2DHWouTS1bE5TCSjREZ8xJHAIn_lMhMrwh/pub?gid=546953721&single=true&output=csv";

  const res = await fetch(url);
  const text = await res.text();
  const lines = text.trim().split("\n");
  return lines.slice(1).map((line) => {
    const parts = line.split(",");
    return {
      jugador1Equipo1: parts[0]?.trim() || "",
      jugador2Equipo1: parts[1]?.trim() || "",
      jugador3Equipo1: parts[2]?.trim() || "",
      jugador4Equipo1: parts[3]?.trim() || "",
      jugador5Equipo1: parts[4]?.trim() || "",
      jugador1Equipo2: parts[5]?.trim() || "",
      jugador2Equipo2: parts[6]?.trim() || "",
      jugador3Equipo2: parts[7]?.trim() || "",
      jugador4Equipo2: parts[8]?.trim() || "",
      jugador5Equipo2: parts[9]?.trim() || "",
      fecha: parts[10]?.trim() || "",
      ganador: parts[11]?.trim() || "",
      fechaNumero: parts[12]?.trim() || "",
    } satisfies Match;
  });
}

export default async function Home() {
  "use cache";

  cacheLife("weeks");
  cacheTag("homepage");

  const [playerStats, matches] = await Promise.all([
    fetchPlayerStats(),
    fetchMatches(),
  ]);

  return (
    <section className="relative flex items-start justify-center overflow-hidden pt-8 pb-20">
      <div className="relative z-10 container mx-auto px-4 text-white">
        <div className="mx-auto max-w-7xl space-y-8">
          {/* Standings Table */}
          <div className="flex justify-center">
            <div className="overflow-hidden rounded-lg border-2 border-[#3FA6E8] bg-gray-900/80 shadow-xl shadow-[#3FA6E8]/10">
              <div className="overflow-x-auto">
                <table className="text-sm">
                  <thead>
                    <tr className="border-b-2 border-[#3FA6E8] bg-linear-to-r from-[#3FA6E8] to-[#3FA6E8]/80">
                      <th className="px-6 py-3 text-left font-bold text-white">
                        Jugador
                      </th>
                      <th className="px-4 py-3 text-center font-bold text-white">
                        PTS
                      </th>
                      <th className="px-4 py-3 text-center font-bold text-white">
                        PJ
                      </th>
                      <th className="px-4 py-3 text-center font-bold text-white">
                        PG
                      </th>
                      <th className="px-4 py-3 text-center font-bold text-white">
                        PE
                      </th>
                      <th className="px-4 py-3 text-center font-bold text-white">
                        PP
                      </th>
                      <th className="px-6 py-3 text-left font-bold text-white">
                        Estado
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {playerStats.map((player, index) => (
                      <tr
                        key={`${player.nombre}-${index}`}
                        className={`border-b border-gray-800/50 ${
                          index % 2 === 0 ? "bg-gray-800/40" : "bg-gray-900/40"
                        } transition-colors hover:bg-[#3FA6E8]/10`}
                      >
                        <td className="px-6 py-3 font-semibold text-white">
                          {player.nombre}
                        </td>
                        <td className="px-4 py-3 text-center font-bold text-[#F5C255]">
                          {formatNumber(player.puntos)}
                        </td>
                        <td className="px-4 py-3 text-center text-gray-300">
                          {formatNumber(player.jugados)}
                        </td>
                        <td className="px-4 py-3 text-center text-[#39DE42]">
                          {formatNumber(player.ganados)}
                        </td>
                        <td className="px-4 py-3 text-center text-[#F5C255]">
                          {formatNumber(player.empatados)}
                        </td>
                        <td className="px-4 py-3 text-center text-[#FD0100]">
                          {formatNumber(player.perdidos)}
                        </td>
                        <td className="px-6 py-3 text-gray-300">
                          {player.estado}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Match History */}
          <div className="space-y-6">
            <h2 className="bg-linear-to-r from-[#3FA6E8] to-[#39DE42] bg-clip-text text-center text-2xl font-bold text-transparent md:text-3xl">
              Historial de Partidos
            </h2>
            <div className="space-y-4">
              {matches
                .sort(
                  (a, b) =>
                    parseInt(b.fechaNumero, 10) - parseInt(a.fechaNumero, 10),
                )
                .map((match, idx) => {
                  const isTeam1Winner = match.ganador === "E1";
                  const isTeam2Winner = match.ganador === "E2";
                  const isTie = match.ganador === "Empate";

                  const team1Players = [
                    match.jugador1Equipo1,
                    match.jugador2Equipo1,
                    match.jugador3Equipo1,
                    match.jugador4Equipo1,
                    match.jugador5Equipo1,
                  ].filter(Boolean);

                  const team2Players = [
                    match.jugador1Equipo2,
                    match.jugador2Equipo2,
                    match.jugador3Equipo2,
                    match.jugador4Equipo2,
                    match.jugador5Equipo2,
                  ].filter(Boolean);

                  const team1Color = isTeam1Winner
                    ? "bg-[#19611d] text-white border-2 border-[#39DE42]/50"
                    : isTie
                      ? "bg-[#F5C255] text-gray-900 border-2 border-[#F5C255]/50"
                      : "bg-[#7b0000] text-white border-2 border-[#FD0100]/50";

                  const team2Color = isTeam2Winner
                    ? "bg-[#19611d] text-white border-2 border-[#39DE42]/50"
                    : isTie
                      ? "bg-[#F5C255] text-gray-900 border-2 border-[#F5C255]/50"
                      : "bg-[#7b0000] text-white border-2 border-[#FD0100]/50";

                  return (
                    <div
                      key={`${match.fechaNumero}-${idx}`}
                      className="rounded-xl border-2 border-[#3FA6E8]/30 bg-linear-to-br from-gray-800/80 to-gray-900/80 p-4 shadow-lg transition-all hover:shadow-[#3FA6E8]/20"
                    >
                      <div className="flex flex-col md:flex-row md:items-stretch md:gap-4">
                        {/* Team 1 */}
                        <div className="flex-1">
                          <div className="grid h-full grid-cols-5 gap-2">
                            {team1Players.map((player, index) => {
                              const key = `t1-${player}-${index}`;
                              return (
                                <div
                                  key={key}
                                  className={`${team1Color} flex h-12 items-center justify-center rounded-lg px-2 py-2 text-center text-xs font-bold shadow-md`}
                                >
                                  <span className="line-clamp-2 leading-tight">
                                    {player}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Center info */}
                        <div className="my-3 flex flex-col items-center justify-center md:my-0 md:min-w-[100px] md:border-x-2 md:border-[#3FA6E8]/30 md:px-3">
                          <div className="text-center text-sm font-bold text-[#3FA6E8]">
                            Fecha {match.fechaNumero}
                          </div>
                          <div className="mt-1 text-center text-xs text-[#F5C255]">
                            {match.fecha}
                          </div>
                        </div>

                        {/* Team 2 */}
                        <div className="flex-1">
                          <div className="grid h-full grid-cols-5 gap-2">
                            {team2Players.map((player, index) => {
                              const key = `t2-${player}-${index}`;
                              return (
                                <div
                                  key={key}
                                  className={`${team2Color} flex h-12 items-center justify-center rounded-lg px-2 py-2 text-center text-xs font-bold shadow-md`}
                                >
                                  <span className="line-clamp-2 leading-tight">
                                    {player}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
