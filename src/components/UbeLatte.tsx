type UbeLatteProps = {
  level: number
}

function UbeLatte({ level }: UbeLatteProps) {
  const liquidOffset = Math.min(level, 3) * 19

  return (
    <svg viewBox="0 0 100 133" fill="none" aria-hidden="true">
      <defs>
        <clipPath id="ube-cup">
          <path d="M20 47h60l-7 84c-10 5-36 5-46 0l-7-84Z" />
        </clipPath>
      </defs>

      <g
        stroke="#22211F"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path fill="#C6D7E8" d="m52 35-5-30h9l4 31" />

        <g clipPath="url(#ube-cup)">
          <g
            className="ube-latte__liquid"
            style={{
              transform: `translateY(${liquidOffset}px)`,
              opacity: level >= 3 ? 0 : 1,
            }}
          >
            <path d="M21 61h58v70H21z" fill="#B69ACD" stroke="none" />
            <path
              d="M21 101c9 4 15 12 24 22 8-11 16-18 34-27v35H21v-30Z"
              fill="#EEE8DF"
              stroke="none"
            />
            <path
              d="m29 58 9-7 8 8-9 6-8-7ZM48 57l8-6 8 7-8 6-8-7ZM65 57l7-5 6 7-7 5-6-7Z"
              fill="#D8C5E7"
            />
          </g>
        </g>

        <path fill="#F4F0E7" d="M15 36c12-5 57-5 70 0l-2 11H17l-2-11Z" />
        <path d="M20 47h60l-7 84c-10 5-36 5-46 0l-7-84Z" />
        <path d="M17 40h66M28 131c10 3 34 3 44 0" />
      </g>
    </svg>
  )
}

export default UbeLatte
