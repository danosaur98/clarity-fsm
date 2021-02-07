;; Clarity smart contract for coin-operated turnstile finite state machine (fsm)
;; Applicable when a user has to pay for a service

;; define state variable
;; 0 is locked, 1 is unlocked, can easily extend to other states
(define-data-var state int 0)

;; push method
;; if state is locked, push will have no effect
;; if state is unlocked, push will turn state into locked
(define-public (push)
    (begin 
        (if (is-eq (var-get state) 1) ;; if unlocked, turn state into locked
            (var-set state 0)
            (var-set state (var-get state)) ;; if locked, leave state as locked
        )
        (ok (var-get state))
    )
)

;; coin method
;; if state is locked, coin will turn state into unlocked
;; if state is unlocked, coin will have no effect
(define-public (coin)
    (begin 
        (if (is-eq (var-get state) 0) ;; if locked, turn state into unlocked
            (var-set state 1)
            (var-set state (var-get state)) ;; if unlocked, leave state as unlocked
        )
        (ok (var-get state))
    )
)

;; state getter
(define-public (get-state)
  (ok (var-get state)))