defmodule WaypointWeb.Router do
  use WaypointWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :put_root_layout, html: {WaypointWeb.Layouts, :root}
    plug :protect_from_forgery
    plug :put_secure_browser_headers
    plug Inertia.Plug
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", WaypointWeb do
    pipe_through :browser

    get "/", DemoController, :page_a
    get "/demo/a", DemoController, :page_a
    get "/demo/b", DemoController, :page_b
  end

  # Enable LiveDashboard and Swoosh mailbox preview in development
  if Application.compile_env(:waypoint, :dev_routes) do
    import Phoenix.LiveDashboard.Router

    scope "/dev" do
      pipe_through :browser

      live_dashboard "/dashboard", metrics: WaypointWeb.Telemetry
      forward "/mailbox", Plug.Swoosh.MailboxPreview
    end
  end
end
