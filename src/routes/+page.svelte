<script>
    import Navbar from "./Navbar.svelte";
    import CampaignCard from "./CampaignCard.svelte";

    /** @type {import('./$types').PageData} */
    export let data;
</script>

<Navbar communities={[]} />
<div class="flex flex-col pt-10 space-y-10 bg-base-200 min-h-screen">
    {#each {length: data.campaigns.length / 3 + 1} as _, i}
    <!-- TODO -->
    <div class="flex justify-center items-center space-x-16">
        {#each data.campaigns.slice(i * 3, i * 3 + 3) as campaign}
        <CampaignCard {...campaign} />
        {/each}
    </div>
    {/each}
</div>
