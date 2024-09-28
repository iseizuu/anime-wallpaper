export interface hoyoResult {
    data: {
        list: [
            {
                post: {
                    game_id: number;
                    post_id: string;
                    f_forum_id: number;
                    uid: string;
                    subject: string;
                    content: string;
                    cover: string;
                    view_type: number;
                    created_at: number;
                    images: string[];
                    post_status: {
                        is_top: boolean;
                        is_good: boolean;
                        is_official: boolean;
                        is_vote: boolean;
                        is_quiz_vote: boolean;
                    };
                    topic_ids: number[];

                    reply_time: string;
                    is_interactive: boolean;
                    structured_content: string;
                    lang: string;
                    official_type: number;
                    reply_forbid: {
                        date_type: number;
                        start_date: string;
                        cur_date: string;
                        level: number;
                    };
                    video: string;
                    origin_lang: string;
                    sub_type: number;
                    has_cover: boolean;
                    desc: string;
                }
                topics: [
                    {
                        id: number;
                        name: string;
                        cover: string;
                        is_top: boolean;
                        is_good: boolean;
                        is_interactive: boolean;
                        game_id: number;
                        add_by: number;
                        entry_style: number;
                    }
                ]
                user: {
                    uid: string;
                    nickname: string;
                    introduce: string;
                    avatar: string;
                    gender: number;
                    certification: {
                        type: number;
                        icon_url: string;
                        desc: string;
                    };
                    level_exp: {
                        level: number;
                        exp: number;
                    };
                    is_following: boolean;
                    is_followed: boolean;
                    avatar_url: string;
                    auth: null | string;
                    is_logoff: boolean;
                    pendant: string;
                    was_following: boolean;
                    post_num: number;
                    badge: {
                        id: string;
                        level: number;
                        icon_url: string;
                        badge_app_path: string;
                        badge_web_path: string;
                        center_app_path: string;
                        center_web_path: string;
                        total: number;
                    };
                    lantern: null | string;
                }
                game: {
                    game_id: number;
                    game_name: string;
                    color: string;
                    background_color: string;
                }
            }
        ]
    }
}