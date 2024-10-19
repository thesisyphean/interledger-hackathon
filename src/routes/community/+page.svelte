<script>
    import Card from "./Card.svelte";

    let campaigns = [
        {
            imageURL: "https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg",
            title: "Feature 1",
            description: "This is feature 1, which acts as follows:",
            actionText: "Perform 1",
            action: () => {}
        },
        {
            imageURL: "https://gratisography.com/wp-content/uploads/2024/03/gratisography-funflower-800x525.jpg",
            title: "Feature 2",
            description: "This is feature 2, which acts as follows:",
            actionText: "Perform 2",
            action: () => {}
        },
        {
            imageURL: "https://gratisography.com/wp-content/uploads/2024/10/gratisography-foliage-face-800x525.jpg",
            title: "Feature 3",
            description: "This is feature 3, which acts as follows:",
            actionText: "Perform 3",
            action: () => {}
        },
        {
            imageURL: "https://gratisography.com/wp-content/uploads/2024/10/gratisography-foliage-face-800x525.jpg",
            title: "Feature 4",
            description: "This is feature 4, which acts as follows:",
            actionText: "Perform 4",
            action: () => {}
        },
        {
            imageURL: "https://gratisography.com/wp-content/uploads/2024/10/gratisography-foliage-face-800x525.jpg",
            title: "Feature 4",
            description: "This is feature 4, which acts as follows:",
            actionText: "Perform 4",
            action: () => {}
        },
    ];
</script>

<div class="flex flex-col space-y-10 bg-base-200 min-h-screen">
    {#each {length: campaigns.length / 3 + 1} as _, i}
    <!-- TODO -->
    <div class="flex justify-center items-center space-x-16">
        {#each campaigns.slice(i * 3, i * 3 + 3) as campaign}
        <Card {...campaign} />
        {/each}
    </div>
    {/each}
</div>
