<script>
    import Navbar from "../Navbar.svelte";
    import CampaignCard from "../CampaignCard.svelte";

    /** @type {import('./$types').PageData} */
    export let data;
</script>

<Navbar communities={data.communities} />
<div class="flex flex-col pt-10 space-y-10 bg-base-200 min-h-screen">
    {#if data.campaigns.length > 0}
    <h1 class="w-full text-center text-xl">Campaigns:</h1>
    {#each {length: data.campaigns.length / 3 + 1} as _, i}
    <div class="flex justify-center items-center space-x-16">
        {#each data.campaigns.slice(i * 3, i * 3 + 3) as campaign}
        <CampaignCard {...campaign} />
        {/each}
    </div>
    {/each}
    {:else if data.campaigns.length === 0}
    <h1 class="w-full text-center text-xl">No Campaigns</h1>
    {:else}
    <h1 class="w-full text-center text-xl">Failed to Load Campaigns</h1>
    {/if}
</div>