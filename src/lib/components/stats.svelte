<script lang="ts">
	let pts = 0;
	let lb = 0;

	export const updatePts = async (points: number) => {
		let ogPts = pts;
		for (let p = 0; p < 100; p++) {
			pts = Math.trunc(ogPts + points * easeOut(p / 100));
			await new Promise((resolve) => setTimeout(resolve, 5));
		}
		pts = points;
	};

	export const setPts = async (points: number) => {
		pts = points;
	};

	export const updateLb = (
		leaderboardpos: number,
		leaderboard: { [key: string]: { name: string; pos: number; pts: number } },
		uuid: string
	) => {
		setPts(leaderboard[uuid].pts);
		lb = leaderboardpos;
	};

	function easeOut(x: number): number {
		return Math.sin((x * Math.PI) / 2);
	}
</script>

<div class="h-32 mbox flex flex-col items-center justify-center">
	<p class="text-xs">Your points:</p>
	<p>{pts}</p>
	<p class="text-xs">#{lb + 1} on leaderboard</p>
</div>
