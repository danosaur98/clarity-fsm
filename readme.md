# Turnstile (FSM) smart contract

A contract for a coin based turnstile finite state machine (FSM).

![Turnstile Finite State Machine](assets/turnstile_fsm.png)

## Usage

The contract exposes two methods: `push` and `coin`.

### `push`

If the state is locked, `push` will have no effect. If the state is unlocked, `push` will turn state into locked.

### `coin`

If the state is unlocked, `coin` will have no effect. If the state is locked, `coin` will turn the state into unlocked.
