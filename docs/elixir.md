# Elixir Guidelines

## Language rules

- Lists **do not** support index-based access (`mylist[i]`)—use `Enum.at/2`, pattern matching, or `List`
- Variables are immutable but rebindable—bind the result of `if`/`case`/`cond` to a variable:

      socket =
        if connected?(socket) do
          assign(socket, :val, val)
        end

- **Never** nest multiple modules in the same file
- **Never** use map access syntax (`changeset[:field]`) on structs—use `my_struct.field` or `Ecto.Changeset.get_field/2`
- Use the standard library for date/time (`Time`, `Date`, `DateTime`, `Calendar`)—no extra deps unless parsing is needed (`date_time_parser`)
- Don't use `String.to_atom/1` on user input
- Predicate functions end with `?` (not `is_`); reserve `is_` for guards
- OTP primitives (`DynamicSupervisor`, `Registry`) require names in child specs
- Use `Task.async_stream/3` for concurrent enumeration—usually pass `timeout: :infinity`

## Mix

- Read docs before using tasks (`mix help task_name`)
- Debug test failures: `mix test test/my_test.exs` or `mix test --failed`
- Avoid `mix deps.clean --all` unless truly needed

## Testing

- **Always** use `start_supervised!/1` for process cleanup
- **Avoid** `Process.sleep/1` and `Process.alive?/1`—use `Process.monitor/1` + `assert_receive {:DOWN, ...}` or `:sys.get_state/1` for synchronization
