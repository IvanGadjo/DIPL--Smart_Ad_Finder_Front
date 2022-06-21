import {
    HomeIcon,
    QuestionMarkCircleIcon,
    UsersIcon,
    DocumentSearchIcon,
  } from '@heroicons/react/outline';




export const navigation = [
    { name: 'Почетна', href: 'home', icon: HomeIcon, current: false },
    { name: 'Огласи', href: 'advertisments', icon: DocumentSearchIcon, current: false },
    { name: 'Како работи', href: 'howItWorks', icon: QuestionMarkCircleIcon, current: false },
    { name: 'Подесувања и профил', href: 'settings', icon: UsersIcon, current: false },
]


