export default {
    home: {
        intro: {
            line1: "안녕하세요, 사라예요",
            line2: "풀스택 개발자예요",
        },
        description: {
            part1: "커피를 좋아하고 ",
            part2: "(조금 너무 많은) ",
            part3: "취미를 모으는 사람이에요",
        },
        hint: "페이지가 좀 비어 보이지 않나요?\n숨겨진 스티커를 다 찾아보세요!",
    },

    nav: {
        home: "홈",
        projects: "프로젝트",
        about: "소개",
        instruction: "입력을 시작하거나 아래 프롬프트를 사용해보세요.",
    },

    sticker: {
        found: "",
        suffix: " 스티커를 찾았어요!",

        lang: {
            name: "폴리글랏",
            desc: "여러 언어를 할 줄 알아요... 근데 가끔 문장 중간에 섞어 써요. 저한텐 자연스러운데, 남들은 좀 헷갈려하더라고요.",
        },
        coffee: {
            name: "커피",
            desc: "커피를 정말 좋아하는데… 뜨거울 때 마신 적이 거의 없어요.",
        },
        multitask: {
            name: "멀티태스커",
            desc: "전생엔 일러스트레이터이자 모션 디자이너였어요. 지금은 그냥 재미로 그림 그리고 싶어요.",
        },
        photo: {
            name: "사진작가",
            desc: "사진이 18,000장 넘게 저장돼 있어요. 절대 안 지워요.",
        },
        pokemon: {
            name: "포켓몬 팬",
            desc: "요즘 새로운 취미가 생겼어요 — 포켓몬 카드 수집. 근데 진짜 재미는 정리하는 거예요...",
        },
        smile: {
            name: "😊😊😊",
            desc: "이 이모지 너무 많이 써요. 그냥 기분 좋을 때 자동으로 나와요.",
        },
        travel: {
            name: "여행자",
            desc: "공항에 있을 때 아이디어가 제일 잘 떠올라요. 어딘가 사이에 있다는 느낌이 좋아요.",
        },
    },

    projects: {
        portfolio: {
            title: "포트폴리오",
            desc: "처음부터 직접 설계하고 개발한 사이트 — 지금 보고 계신 바로 이 페이지예요.",
            features: [
                { label: "커스텀 커서", desc: "문맥에 따라 반응하는 완전 커스텀 커서." },
                { label: "숨겨진 스티커", desc: "제 취미를 더 알아갈 수 있는 이스터에그가 곳곳에 숨어 있어요." },
                { label: "다국어 지원", desc: "자연스러운 언어 전환이 가능한 i18n 지원." },
                { label: "테마", desc: "부드러운 전환 효과가 있는 다크/라이트 모드." },
            ],
        },
        predik360: {
            title: "Predik360",
            desc: "EHPAD(요양원)들이 함께 구매해 의료 및 케어 용품을 더 좋은 가격에 협상할 수 있도록 돕는 공동구매 플랫폼.",
            features: [
                { label: "공동 주문", desc: "EHPAD들이 주문을 모아 볼륨 기반 할인을 받을 수 있어요." },
                { label: "청구서 관리", desc: "각 기관별 청구서 생성 및 이력 관리." },
                { label: "연락처 목록", desc: "기관별 중앙화된 연락처 관리." },
                { label: "역할 시스템", desc: "사용자 및 조직 단위의 다단계 역할 및 권한 관리." },
                { label: "제품 카테고리", desc: "용품 분류를 위한 다단계 카테고리 계층 구조 (대분류, 소분류)." },
            ],
            contributions: [
                { label: "요구사항 명세", desc: "플랫폼의 기술 및 기능 명세서 작성." },
                { label: "팀 관리", desc: "개발팀 조율 및 일정 관리." },
            ],
        },
        meta: {
            tags: "태그",
            tech: "기술 스택",
            year: "연도",
        },
    },

    about: {
        description:
            "그래픽 디자이너 출신의 풀스택 개발자로, Angular, React, Spring Boot를 활용해 깔끔한 아키텍처와 사용자 중심의 디자인을 결합한 웹 애플리케이션을 개발합니다.",

        companies: {
            title: "함께 일한 회사",
            list: [
                "Empirys (룩셈부르크)",
                "적십자사 (벨기에)",
                "AvProd (프랑스)",
                "87 seconds (벨기에)",
            ],
        },

        skills: {
            title: "기술",
            categories: {
                development: "개발",
                interface: "인터페이스",
            },
            list: {
                dev: [
                    "Java · Spring Boot",
                    "React · Angular · TypeScript",
                    "Node.js · NestJS",
                    "MySQL · MongoDB",
                    "SonarQube · Docker",
                ],
                ui: [
                    "UI/UX · 디자인 시스템",
                    "Framer Motion",
                    "반응형 디자인",
                    "Figma",
                    "Adobe Suite",
                ],
            },
        },
    },
};