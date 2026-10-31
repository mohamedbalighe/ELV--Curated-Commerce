'use server'

export async function resetPassword({email, newPassword}:{email:string,newPassword:string}) {
    try {
        const response = await fetch('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                newPassword: newPassword
            })
        });

        const data = await response.json();

        if (!response.ok) {
             throw new Error("Error Password reset Api>>",data.message)
        }

       return data;

    } catch (error) {
        console.error('Error Password reset Api:', error);
        throw error

    }
}
