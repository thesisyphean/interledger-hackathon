<script>
  import LoanCard from "./LoanCard.svelte";
  import ProgressBar from "./ProgressBar.svelte";

  /** @type {import('./$types').PageData} */
  export let data;
  const amountFunded = data.loans.reduce((acc, loan) => acc + loan.amountPaid, 0);
</script>

<div class="min-h-screen space-y-10 bg-base-200 p-10">
  <div class="flex flex-row items-center space-x-10">
    <div class="flex items-end space-x-10">
      <h1 class="text-3xl">{data.campaignName}</h1>
      {#if data.isOwner}
        <p class="text-xl">{data.description.slice(0, 10)}...</p>
      {:else}
        <div class="avatar placeholder">
          <div class="w-16 rounded-full bg-neutral text-neutral-content">
            <span class="text-2xl">D</span>
          </div>
        </div>
      {/if}
    </div>
    <ProgressBar percentFunded={(amountFunded / data.requiredAmount) * 100} />
  </div>
  {#if data.isOwner}
    <div class="space-y-8">
      {#each data.loans as loan}
        <LoanCard {...loan} />
      {/each}
    </div>
  {:else}
    <div class="flex flex-row space-x-4 rounded-xl bg-base-100 p-4 shadow-xl">
    <img class="rounded-xl h-32"
      src="https://c8.alamy.com/comp/2K31TN8/he-only-has-eyes-for-his-boy-a-young-man-lifting-his-son-up-into-the-air-2K31TN8.jpg"
      alt="Movie"
    />
      <p class="text-lg">{data.description}</p>
      <div class="flex flex-col space-y-8">
        <button class="btn btn-primary">Donate</button>
        <button class="btn btn-primary">Lend</button>
      </div>
    </div>
  {/if}
</div>
