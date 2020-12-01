import * as React from "react"

const iconcolor = "var(--primary-clr)"

const icons = {
    "brightnes-contrast": (
        <>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 7C13.3915 7 14.6502 7.56842 15.5567 8.48574C15.5774 8.50666 15.5978 8.52776 15.6182 8.54905C16.4743 9.44641 17 10.6618 17 12C17 13.3915 16.4316 14.6502 15.5143 15.5567C15.4938 15.5769 15.4732 15.5969 15.4524 15.6168C14.5549 16.4737 13.3389 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7ZM12 15V9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                fill={iconcolor}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13 0V3.69231H11V0H13ZM4.22181 2.80753L6.83267 5.41839L5.41846 6.8326L2.8076 4.22175L4.22181 2.80753ZM21.1924 4.22175L18.5815 6.83261L17.1673 5.41839L19.7782 2.80754L21.1924 4.22175ZM3.69231 13H0V11H3.69231V13ZM24 13H20.3077V11H24V13ZM6.83267 18.5815L4.22181 21.1923L2.8076 19.7781L5.41846 17.1672L6.83267 18.5815ZM18.5815 17.1672L21.1924 19.7781L19.7782 21.1923L17.1673 18.5815L18.5815 17.1672ZM13 20.3077V24H11V20.3077H13Z"
                fill={iconcolor}
            />
        </>
    ),
    settings: (
        <>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9 3C7.13616 3 5.57006 4.27477 5.12602 6H2V8H5.12602C5.57006 9.72523 7.13616 11 9 11C10.8638 11 12.4299 9.72523 12.874 8H22V6H12.874C12.4299 4.27477 10.8638 3 9 3ZM7 7C7 8.10457 7.89543 9 9 9C10.1046 9 11 8.10457 11 7C11 5.89543 10.1046 5 9 5C7.89543 5 7 5.89543 7 7Z"
                fill={iconcolor}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.126 16C11.5701 14.2748 13.1362 13 15 13C16.8638 13 18.4299 14.2748 18.874 16H22V18H18.874C18.4299 19.7252 16.8638 21 15 21C13.1362 21 11.5701 19.7252 11.126 18H2V16H11.126ZM15 19C13.8954 19 13 18.1046 13 17C13 15.8954 13.8954 15 15 15C16.1046 15 17 15.8954 17 17C17 18.1046 16.1046 19 15 19Z"
                fill={iconcolor}
            />
        </>
    ),
    blur: (
        <>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C12 2 20 8.34146 20 14.1951C20 19.0732 16.1191 22 12 22C7.88094 22 4 19.0732 4 14.1951C4 8.34146 12 2 12 2ZM12 4.6498C11.3033 5.29236 10.4059 6.17593 9.514 7.20926C8.57399 8.2983 7.67452 9.51412 7.01785 10.7554C6.35501 12.0083 6 13.1734 6 14.1951C6 17.782 8.78923 20 12 20C15.2108 20 18 17.782 18 14.1951C18 13.1734 17.645 12.0083 16.9821 10.7554C16.3255 9.51412 15.426 8.2983 14.486 7.20926C13.5941 6.17593 12.6967 5.29236 12 4.6498Z"
                fill={iconcolor}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 16C13.0663 16 14 15.2516 14 14H16C16 16.4984 14.023 18 12 18V16Z"
                fill={iconcolor}
            />
        </>
    ),
    bulge: (
        <>
            <path
                opacity="0.4"
                d="M1.19232 20.8231C3.06895 20.129 4.31732 18.4839 5.23778 16.6727C6.12589 14.9252 6.7972 12.8401 7.42172 10.9003C7.44807 10.8185 7.47433 10.7369 7.50052 10.6557C8.16445 8.59544 8.77796 6.74388 9.55406 5.40023C10.3287 4.05909 11.1006 3.5 12 3.5C12.9254 3.5 13.6689 4.03583 14.3967 5.29731C15.1366 6.57973 15.7058 8.35515 16.3441 10.3726L16.3698 10.4538C16.9842 12.3963 17.6574 14.5245 18.6029 16.3511C19.5634 18.2067 20.8706 19.8845 22.8276 20.7452C22.8955 20.775 22.9447 20.8182 22.9725 20.8564C22.9981 20.8915 23 20.9131 23 20.9222C23 20.9652 22.9652 21 22.9222 21H1.0217C1.01686 21 1.01477 20.9992 1.01356 20.9987C1.01169 20.9979 1.00905 20.9963 1.00636 20.9936C1.00367 20.991 1.00209 20.9883 1.00129 20.9864C1.00078 20.9852 1 20.9831 1 20.9783L0.999998 20.9783C0.999977 20.9781 0.999833 20.9771 1.0014 20.973C1.00341 20.9676 1.00923 20.955 1.02372 20.9371C1.0551 20.8982 1.1133 20.8523 1.19231 20.8231L0.845415 19.8852L1.19232 20.8231Z"
                fill={iconcolor}
            />
            <path
                opacity="0.7"
                d="M1.1244 20.8405C4.88786 19.6409 6.76385 16.4361 8.17035 13.8763C8.25799 13.7168 8.34344 13.5604 8.4271 13.4074C9.04524 12.2764 9.56556 11.3243 10.1445 10.6084C10.7767 9.82661 11.342 9.5 12 9.5C12.6629 9.5 13.1662 9.80338 13.7134 10.5298C14.1857 11.1569 14.5939 11.9659 15.0904 12.9502C15.2133 13.1938 15.3416 13.4482 15.4776 13.7131C16.7991 16.2873 18.6683 19.4544 22.8902 20.8277C22.9315 20.8411 22.9624 20.8654 22.9806 20.8891C22.9974 20.9109 23 20.9268 23 20.9371C23 20.9718 22.9718 21 22.9371 21H1.04762C1.02132 21 1 20.9787 1 20.9524C1 20.9475 1.00058 20.9337 1.01919 20.91C1.03983 20.8839 1.0761 20.8559 1.1244 20.8405Z"
                fill={iconcolor}
            />
            <path
                d="M1.05469 20.9124C5.01062 20.0593 6.83443 18.8841 8.21208 17.9236C8.27047 17.8829 8.3272 17.8433 8.38246 17.8046C8.9719 17.3926 9.39457 17.0971 9.89322 16.8785C10.4056 16.6537 11.0317 16.5 12 16.5C12.9945 16.5 13.5985 16.6329 14.0716 16.8252C14.5415 17.0162 14.9283 17.28 15.5123 17.6783C15.55 17.704 15.5886 17.7303 15.628 17.7571C16.9465 18.6551 18.7589 19.812 22.9392 20.8758C22.9833 20.887 23 20.9216 23 20.9433C23 20.9746 22.9746 21 22.9433 21H1.03604C1.01614 21 1 20.9839 1 20.964C1 20.958 1.00141 20.9497 1.01063 20.9385C1.02059 20.9265 1.03568 20.9165 1.05469 20.9124Z"
                fill={iconcolor}
            />
        </>
    ),
    channels: (
        <>
            <circle cx="12" cy="8" r="6" fill={iconcolor} fillOpacity="0.4" />
            <circle cx="7" cy="16" r="6" fill={iconcolor} fillOpacity="0.7" />
            <circle cx="17" cy="16" r="6" fill={iconcolor} fillOpacity="0.9" />
        </>
    ),
    dotted: (
        <>
            <path
                d="M12 8.99991C12.8284 8.99991 13.5 8.32833 13.5 7.49989C13.5 6.67146 12.8284 5.99988 12 5.99988C11.1715 5.99988 10.5 6.67146 10.5 7.49989C10.5 8.32833 11.1715 8.99991 12 8.99991Z"
                fill={iconcolor}
            />
            <path
                d="M7.41659 8.16665C7.83081 8.16665 8.1666 7.83086 8.1666 7.41665C8.1666 7.00243 7.83081 6.66664 7.41659 6.66664C7.00238 6.66664 6.66659 7.00243 6.66659 7.41665C6.66659 7.83086 7.00238 8.16665 7.41659 8.16665Z"
                fill={iconcolor}
            />
            <path
                d="M11.9166 12.6667C12.3308 12.6667 12.6666 12.3309 12.6666 11.9167C12.6666 11.5025 12.3308 11.1667 11.9166 11.1667C11.5024 11.1667 11.1666 11.5025 11.1666 11.9167C11.1666 12.3309 11.5024 12.6667 11.9166 12.6667Z"
                fill={iconcolor}
            />
            <path
                d="M8.1666 11.9167C8.1666 12.3309 7.83081 12.6667 7.41659 12.6667C7.00238 12.6667 6.66659 12.3309 6.66659 11.9167C6.66659 11.5025 7.00238 11.1667 7.41659 11.1667C7.83081 11.1667 8.1666 11.5025 8.1666 11.9167Z"
                fill={iconcolor}
            />
            <path
                d="M13.5 16.5C13.5 17.3284 12.8284 18 12 18C11.1715 18 10.5 17.3284 10.5 16.5C10.5 15.6716 11.1715 15 12 15C12.8284 15 13.5 15.6716 13.5 16.5Z"
                fill={iconcolor}
            />
            <path
                d="M7.49989 18C8.32833 18 8.99991 17.3284 8.99991 16.5C8.99991 15.6716 8.32833 15 7.49989 15C6.67146 15 5.99988 15.6716 5.99988 16.5C5.99988 17.3284 6.67146 18 7.49989 18Z"
                fill={iconcolor}
            />
            <path
                d="M18 12C18 12.8285 17.3284 13.5 16.4999 13.5C15.6715 13.5 14.9999 12.8285 14.9999 12C14.9999 11.1716 15.6715 10.5 16.4999 10.5C17.3284 10.5 18 11.1716 18 12Z"
                fill={iconcolor}
            />
            <path
                d="M16.4999 8.99991C17.3284 8.99991 18 8.32833 18 7.49989C18 6.67146 17.3284 5.99988 16.4999 5.99988C15.6715 5.99988 14.9999 6.67146 14.9999 7.49989C14.9999 8.32833 15.6715 8.99991 16.4999 8.99991Z"
                fill={iconcolor}
            />
            <path
                d="M18 16.5C18 17.3284 17.3284 18 16.4999 18C15.6715 18 14.9999 17.3284 14.9999 16.5C14.9999 15.6716 15.6715 15 16.4999 15C17.3284 15 18 15.6716 18 16.5Z"
                fill={iconcolor}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2 22V2H22V22H2ZM4 4H20V20H4V4Z"
                fill={iconcolor}
            />
        </>
    ),
    exposure: (
        <>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11 9H7V7H11V9Z"
                fill={iconcolor}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2 22V2H22V22H2ZM4 4H20L4 20V4ZM17 15V13H15V15H13V17H15V19H17V17H19V15H17Z"
                fill={iconcolor}
            />
        </>
    ),
    gamma: (
        <>
            <rect
                opacity="0.4"
                x="3"
                y="2"
                width="2"
                height="20"
                fill={iconcolor}
            />
            <rect
                opacity="0.6"
                x="8"
                y="2"
                width="2"
                height="20"
                fill={iconcolor}
            />
            <rect
                opacity="0.8"
                x="13"
                y="2"
                width="2"
                height="20"
                fill={iconcolor}
            />
            <rect x="18" y="2" width="3" height="20" fill={iconcolor} />
        </>
    ),
    hue: (
        <>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                fill={iconcolor}
            />
            <path
                d="M16 20C18.989 18.4031 21 15.4185 21 12C21 8.58154 18.989 5.59687 16 4V20Z"
                fill={iconcolor}
            />
            <path
                opacity="0.3"
                d="M19 5.99998C16 3 12 2 9 3.5V20.5C11.5 21.5 14.875 21.5168 19 18V5.99998Z"
                fill={iconcolor}
            />
        </>
    ),
    invert: (
        <>
            <path
                d="M12 18C12.7879 18 13.5681 17.8448 14.2961 17.5433C15.0241 17.2417 15.6855 16.7998 16.2426 16.2426C16.7998 15.6855 17.2417 15.0241 17.5433 14.2961C17.8448 13.5681 18 12.7879 18 12C18 11.2121 17.8448 10.4319 17.5433 9.7039C17.2417 8.97595 16.7998 8.31451 16.2426 7.75736C15.6855 7.20021 15.0241 6.75825 14.2961 6.45672C13.5681 6.15519 12.7879 6 12 6L12 12L12 18Z"
                fill={iconcolor}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M22 2V22H2V2H22ZM12 4H20V20H12V18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6V4Z"
                fill={iconcolor}
            />
        </>
    ),
    kebab: (
        <>
            <path
                d="M7 12C7 13.1046 6.10457 14 5 14C3.89543 14 3 13.1046 3 12C3 10.8954 3.89543 10 5 10C6.10457 10 7 10.8954 7 12Z"
                fill={iconcolor}
            />
            <path
                d="M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z"
                fill={iconcolor}
            />
            <path
                d="M21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12Z"
                fill={iconcolor}
            />
        </>
    ),
    "lens-blur": (
        <>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 15.5352L12.5547 17.8321L11.4453 16.1679L14 14.4648V12H16V15.5352ZM12 2L4 11.0833V17.5L12 23L20 17.5V11.0833L12 2ZM12 5.026L18 11.8385V16.4479L12 20.5729L6 16.4479V11.8385L12 5.026Z"
                fill={iconcolor}
            />
        </>
    ),
    mirror: (
        <>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 4.00001L4.69708 3.28302L12.1028 10.483L19.2929 3.29291L21 4.00001V19.5556L19.3029 20.2726L12.1226 13.2917L4.70711 20.7071L3 20V4.00001ZM10.6884 11.8974L5 6.36695V17.5858L10.6884 11.8974ZM13.5369 11.8773L19 17.1886V6.41423L13.5369 11.8773Z"
                fill={iconcolor}
            />
        </>
    ),
    noise: (
        <>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16.6666 4H20V8.66665H19.3332L19.3332 9.99998V11.3333H20V20H17.9999L17.9999 19.3333H16.6666V18H15.3332V19.3333H16.6666V20H11.3332V19.3333V18L12.6666 18L12.6666 19.3333H13.9999L13.9999 18V16.6666H12.6666H11.3333L11.3332 18H9.99991V19.3333V20H8.66659V19.3333H7.33325L5.99992 19.3333L4.66658 19.3333V18L5.99992 18V16.6666H4.66659L4.66658 18H4V11.3333L4.66658 11.3333H5.99993V9.99998H4.66658L4 9.99998V7.33331L4.66659 7.33331V5.99998L4 5.99998V4H8.66658V4.66665H9.99991V4H15.3333V4.66665H16.6666V4ZM4 19.3333H4.66658L4.66659 20H4V19.3333ZM2 22V2H22V22H2ZM5.99992 5.99998V4.66664H7.33325V5.99998H5.99992ZM16.6666 7.33331L15.3332 7.33331V5.99998H13.9999V7.33331H15.3332V8.66664L16.6666 8.66664L16.6666 9.99998V11.3333H15.3333H13.9999V12.6666H12.6666V11.3333H11.3332V12.6666H12.6666V14V15.3333H13.9999L15.3332 15.3333V16.6666H16.6666V15.3333L17.9999 15.3333V16.6666H19.3332V15.3333H17.9999L17.9999 14H16.6666L16.6666 15.3333H15.3332L15.3333 14H13.9999L13.9999 12.6666L15.3333 12.6666H16.6666V11.3333L17.9999 11.3333V9.99998L17.9999 8.66664L16.6666 8.66664V7.33331ZM7.33325 14H5.99992L5.99992 12.6666H4.66659V14V15.3333L5.99992 15.3333H7.33325L7.33326 16.6666H8.66659L8.66658 15.3333V14L9.99992 14V12.6666V11.3333H8.66659V12.6666H7.33325L7.33325 14ZM7.33325 7.33331H8.66658V8.66665H7.33325L5.99992 8.66665V7.33331L7.33325 7.33331ZM11.3332 8.66664V9.99998H9.99991L8.66659 9.99998L8.66658 8.66665L9.99991 8.66664H11.3332ZM11.3332 8.66664L11.3333 7.33331L9.99993 7.33331V5.99998L11.3333 5.99998H12.6666V7.33331V8.66664H11.3332Z"
                fill={iconcolor}
            />
        </>
    ),
    sharp: (
        <>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21 22L12 2L3 22H21ZM17.9068 20L12 6.87371L6.09317 20H17.9068Z"
                fill={iconcolor}
            />
        </>
    ),
    vibrance: (
        <>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.247803 3.44727L12.0001 22.6783L23.7524 3.44727H0.247803ZM3.81392 5.44727L12.0001 18.8428L20.1863 5.44727H3.81392Z"
                fill={iconcolor}
            />
            <path
                opacity="0.2"
                d="M6.5 11.5L11 4.5H21L12 20L6.5 11.5Z"
                fill={iconcolor}
            />
            <path
                opacity="0.4"
                d="M9.5 16L16 5H21L12 20L9.5 16Z"
                fill={iconcolor}
            />
        </>
    ),
    tint: (
        <>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.7489 11.7248L6.3549 2.33081L4.94069 3.74502L6.19514 4.99947L3.80657 7.38803C3.25157 7.94302 2.79349 8.40108 2.44982 8.80429C2.09297 9.22295 1.80248 9.64606 1.63254 10.1491C1.35198 10.9795 1.35198 11.8792 1.63254 12.7096C1.80248 13.2126 2.09297 13.6357 2.44982 14.0544C2.79349 14.4576 3.25156 14.9157 3.80656 15.4706L3.86349 15.5276C4.41848 16.0826 4.87655 16.5407 5.27975 16.8843C5.69841 17.2412 6.12152 17.5317 6.62452 17.7016C7.45499 17.9822 8.35462 17.9822 9.18508 17.7016C9.68808 17.5317 10.1112 17.2412 10.5299 16.8843C10.9331 16.5407 11.3911 16.0826 11.9461 15.5276L15.7489 11.7248ZM5.24925 8.77379L7.60935 6.41368L12.7731 11.5774L3.43799 11.6809C3.40016 11.3824 3.42994 11.0775 3.52733 10.7892C3.58202 10.6273 3.69343 10.4284 3.97193 10.1017C4.25775 9.76633 4.65868 9.36435 5.24925 8.77379Z"
                fill={iconcolor}
            />
            <path
                d="M17 13C17 13 21 16.4878 21 19.7073C21 22.3902 19.0596 24 17 24C14.9405 24 13 22.3902 13 19.7073C13 16.4878 17 13 17 13Z"
                fill={iconcolor}
            />
        </>
    ),
}

export default icons