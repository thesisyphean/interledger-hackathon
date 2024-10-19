<script>
    import LoanCard from "./LoanCard.svelte";
    import ProgressBar from "./ProgressBar.svelte";

    /** @type {import('./$types').PageData} */
    export let data;
    const amountFunded = data.loans.reduce((acc, loan) => acc + loan.amountPaid, 0);
</script>

<div class="bg-base-200 min-h-screen p-10 space-y-10">
    <div class="flex flex-row items-center space-x-10">
        <div class="flex items-end space-x-10">
            <h1 class="text-3xl">{data.campaignName}</h1>
            <p class="text-xl">{data.description}</p>
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
    <!-- TODO -->
    {/if}
</div>
