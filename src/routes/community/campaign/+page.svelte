<script>
    import LoanCard from "./LoanCard.svelte";
    import ProgressBar from "./ProgressBar.svelte";

    export let campaignName = "Campaign";
    export let description = "Description...";
    export let percentFunded = 55;
    export let isOwner = true;
    export let loans = [
        {
            title: "Loan 1",
            beneficiary: "Joe Biden",
            totalAmount: 1000,
            amountPaid: 500,
        }
    ];
</script>

<div class="bg-base-200 min-h-screen p-10 space-y-10">
    <div class="flex flex-row items-center space-x-10">
        <div class="flex items-end space-x-10">
            <h1 class="text-3xl">{campaignName}</h1>
            <p class="text-xl">{description}</p>
        </div>
        <ProgressBar percentFunded={percentFunded} />
    </div>
    {#if isOwner}
    <div class="space-y-8">
        {#each { length: 5 } as loan}
            <LoanCard title="Loan Title" description="From Joe Biden..." />
        {/each}
    </div>
    {:else}
    <!-- TODO -->
    {/if}
</div>
