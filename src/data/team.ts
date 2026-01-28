// src/data/team.ts

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  image: string; // Путь к фото в public/images/team/
}

export const teamMembers: TeamMember[] = [
  {
    id: 'anna-romanova',
    name: 'Анна Романова',
    role: 'Директор',
    phone: '+7 (912) 666-60-06',
    email: 'anrotrip@yandex.ru',
    image: '/images/team/anna.jpg',
  },
  {
    id: 'elena-kudryavceva',
    name: 'Елена Кудрявцева',
    role: 'Руководитель офиса',
    phone: '+7 (912) 045-00-51',
    email: 'elena@anrotrip.ru',
    image: '/images/team/elena.jpg',
  },
  {
    id: 'ekaterina-smirnova',
    name: 'Екатерина Смирнова',
    role: 'Ведущий менеджер',
    phone: '+7 (982) 654-00-53',
    email: 'ekaterina@anrotrip.ru',
    image: '/images/team/ekaterina.jpg',
  },
  {
    id: 'ksenia-ivanova',
    name: 'Ксения Иванова',
    role: 'Менеджер по туризму',
    phone: '+7 (912) 600-05-36',
    email: 'ksenia@anrotrip.ru',
    image: '/images/team/ksenia.jpg',
  },
  {
    id: 'daria-petrova',
    name: 'Дарья Петрова',
    role: 'Менеджер по туризму',
    phone: '+7 (912) 200-05-83',
    email: 'daria@anrotrip.ru',
    image: '/images/team/daria.jpg',
  },
  {
    id: 'olga-sidorova',
    name: 'Ольга Сидорова',
    role: 'Визовый специалист',
    phone: '+7 (912) 200-05-92',
    email: 'visa@anrotrip.ru',
    image: '/images/team/olga.jpg',
  },
  // ... Добавьте остальных сотрудников здесь
];
