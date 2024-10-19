<div class="card bg-base-100 shadow-xl">
  <div class="card-body">
    <h2 class="card-title text-2xl font-bold">Signup</h2>
    <form method="post">

      <div class="grid grid-cols-2 gap-4">
        <div class="form-control">
          <label class="label">
            <span class="label-text">First Name</span>
          </label>
          <label class="input input-bordered flex items-center gap-2">
            <input name="firstName" type="text" class="grow" placeholder="John" />
          </label>
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Last Name</span>
          </label>
          <label class="input input-bordered flex items-center gap-2">
            <input name="lastName" type="text" class="grow" placeholder="Doe" />
          </label>
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Email</span>
          </label>
          <label class="input input-bordered flex items-center gap-2">
            <input name="email" type="email" class="grow" placeholder="email@example.com" />
          </label>
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Password</span>
          </label>
          <label class="input input-bordered flex items-center gap-2">
            <input name="password" type="password" class="grow" placeholder="Enter password" />
          </label>
        </div>
      </div>
        <div class="form-control mt-4">
          <label class="label">
            <span class="label-text">Wallet URL</span>
          </label>
          <label class="input input-bordered flex items-center gap-2">
            <input name="url" type="text" class="grow" placeholder="Enter wallet address" />
          </label>
        </div>
      <div class="form-control mt-6">
        <button type="submit" class="btn btn-primary"> Signup </button>
      </div>
    </form>
  </div>
</div>
