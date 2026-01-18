export interface CaseStudy {
    id: string;
    title: string;
    location: string;
    summary: string;
    condition: string; // 현장 조건 및 고민
    design: string; // 공정 설계 설명
    carpentry: string; // 목공 시공 역할
    tile: string; // 타일 시공 역할
    finish: string; // 마감 기준
    images: {
        main: string;
        before?: string;
        process?: string[];
        after: string[];
    };
}

export const caseStudies: CaseStudy[] = [
    {
        id: "project-01",
        title: "성수동 H 아파트 34평형",
        location: "서울 성동구 성수동",
        summary: "구축 아파트의 불규칙한 벽체를 목공으로 바로잡고, 대형 포세린 타일로 마감하여 모던한 갤러리 같은 공간을 연출했습니다.",
        condition: "30년 된 구축 아파트로, 벽체 수직 수평이 심하게 맞지 않았습니다. 특히 욕실 확장이 잘못되어 누수 위험이 있었고, 거실 바닥 단차가 30mm 이상 차이나는 악조건이었습니다.",
        design: "기존 미장면을 신뢰할 수 없어, 목공 가벽을 신설해 완벽한 수직면을 만들기로 결정했습니다. 바닥은 전체 철거 후 수평 몰탈 작업을 선행하고, 타일 마감을 위한 기준선을 복도 중심으로 재설정했습니다.",
        carpentry: "전체 천장 평탄화 및 무문선 히든 도어 작업을 진행했습니다. 특히 주방과 거실이 이어지는 라인에 라인 조명 박스를 매립하여 구조적 간결함을 더했습니다.",
        tile: "600x1200 대형 포세린 타일을 졸리컷(면치기) 시공으로 마감했습니다. 목공에서 잡아준 칼각 코너에 맞춰 타일 라인을 1mm 오차 범위 내로 정렬했습니다.",
        finish: "도배와 타일이 만나는 지점의 마이너스 몰딩 처리, 욕실 젠다이 졸리컷 라인 정렬 상태를 중점적으로 검수했습니다.",
        images: {
            main: "/images/case01_main.png",
            before: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2531&auto=format&fit=crop", // Construction site sample
            after: ["/images/case01_detail_1.png", "/images/case01_detail_2.png"]
        }
    },
    {
        id: "project-02",
        title: "판교 상가 쇼룸 리모델링",
        location: "경기 성남시 판교동",
        summary: "상업 공간의 높은 층고를 활용한 아치형 목공 구조물과 텍스처 타일의 조화.",
        condition: "배관이 노출된 높은 천장과 불규칙한 기둥 배치로 공간 활용이 어려웠습니다. 클라이언트는 제품이 돋보이는 차분한 배경을 원했습니다.",
        design: "기둥을 감싸는 라운드 벽체를 신세하여 동선을 유도하고, 거친 질감의 타일로 바닥을 눌러주어 안정감을 주도록 설계했습니다.",
        carpentry: "곡선형 가벽(R가벽) 시공 및 디스플레이 선반 매립 작업. 하중을 견뎌야 하는 선반 내부에 금속 보강 작업을 병행했습니다.",
        tile: "1200x1200 대형 텍스처 타일을 사용. 곡선 벽체와 바닥이 만나는 지점의 정밀 재단 시공이 핵심이었습니다.",
        finish: "곡선 부위의 도장 마감 퀄리티와 타일 메지(줄눈)의 톤 앤 매너 일체화에 집중했습니다.",
        images: {
            main: "/images/case02_main.png",
            before: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2670&auto=format&fit=crop", // Rough concrete sample
            after: ["/images/case02_detail_1.png"]
        }
    }
];
