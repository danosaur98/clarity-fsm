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
        ;; even if state is originally locked or unlocked,
        ;; state should be locked after push
        (var-set state 0)
        (ok (var-get state))
    )
)

;; coin method
;; if state is locked, coin will turn state into unlocked
;; if state is unlocked, coin will have no effect
(define-public (coin)
    (begin 
        ;; even if state is originally locked or unlocked,
        ;; state should be unlocked after coin
        (var-set state 1)
        (ok (var-get state))
    )
)

;; state getter
(define-public (get-state)
  (ok (var-get state)))