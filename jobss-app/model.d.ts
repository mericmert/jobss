declare module "models" {

    type User = {
        id: number;
        email: string;
        exp: number;
        family_name: string;
        given_name: string;
        iat: number;
        iss: string;
        locale: string;
        name: string;
        picture: string;
        role: string;
    }

    type HR = {
        sub: string;
        role: string;
        iat: number;
        exp: number;
    }

    type Post = {
        id: number;
        title: string;
        description: string;
        city: string;
        country: string;
        createdAt: string;
        eligibility: string;
        enabled: boolean;
        level: string;
        activationTime: number;
        deadline: number;
    }

    type Application = {
        id: number;
        jobPost: {
            id: number;
            job_title: string;
        },
        user: {
            id: number;
        }
        post_id: number;
        createdAt: string;
        enabled: boolean;
        status: string;
        coverLetter: string;
        fullName: string;
        major: string;
        school: string;
    }
}