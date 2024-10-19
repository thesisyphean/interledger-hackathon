<script>
    import Card from "./Card.svelte";

    let campaigns = [
        {
            imageURL: "https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg",
            title: "Campaign 1",
            description: "This is campaign 1",
            actionText: "View Campaign 1",
            action: () => {}
        },
        {
            imageURL: "https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg",
            title: "Campaign 2",
            description: "This is campaign 2",
            actionText: "View Campaign 2",
            action: () => {}
        },
        {
            imageURL: "https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg",
            title: "Campaign 3",
            description: "This is campaign 3",
            actionText: "View Campaign 3",
            action: () => {}
        },
        {
            imageURL: "https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg",
            title: "Campaign 4",
            description: "This is campaign 4",
            actionText: "View Campaign 4",
            action: () => {}
        },
        {
            imageURL: "https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg",
            title: "Campaign 5",
            description: "This is campaign 5",
            actionText: "View Campaign 5",
            action: () => {}
        }
    ];
</script>

<div class="flex flex-col pt-10 space-y-10 bg-base-200 min-h-screen">
    {#each {length: campaigns.length / 3 + 1} as _, i}
    <!-- TODO -->
    <div class="flex justify-center items-center space-x-16">
        {#each campaigns.slice(i * 3, i * 3 + 3) as campaign}
        <Card {...campaign} />
        {/each}
    </div>
    {/each}
</div>
