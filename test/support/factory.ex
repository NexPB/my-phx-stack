defmodule Waypoint.Factory do
  @moduledoc """
  ExMachina factory for building test data.

  ## Usage

  In your tests you get these functions for free (imported via DataCase / ConnCase):

      # Build a struct without inserting it
      user = build(:user)

      # Insert into the database
      user = insert(:user)

      # Override specific fields
      user = insert(:user, email: "custom@example.com")

      # Build a list
      users = insert_list(3, :user)

      # Use sequence helpers for unique values
      # (see the sequence/2 calls in each factory below)

  ## Adding new factories

  Add a `def [schema_name]_factory` function that returns a struct (or map)
  with sensible defaults.  Use `sequence/2` for fields that must be unique
  across tests.

      def user_factory do
        %Waypoint.Accounts.User{
          email: sequence(:email, &"user-\#{&1}@example.com"),
          name: "Test User"
        }
      end

  See https://github.com/thoughtbot/ex_machina for the full API.
  """

  use ExMachina.Ecto, repo: Waypoint.Repo

  # ---------------------------------------------------------------------------
  # Add factories below as schemas are created.
  # ---------------------------------------------------------------------------
  #
  # Example (uncomment and adapt when Waypoint.Accounts.User exists):
  #
  #   def user_factory do
  #     %Waypoint.Accounts.User{
  #       email: sequence(:email, &"user-#{&1}@example.com"),
  #       name: sequence(:name, &"User #{&1}"),
  #       inserted_at: DateTime.utc_now() |> DateTime.truncate(:second),
  #       updated_at: DateTime.utc_now() |> DateTime.truncate(:second)
  #     }
  #   end
end
