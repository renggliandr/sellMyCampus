import LoginRegistration from "../components/LoginRegistration";
import UsersAPI from "../lib/api/Users";

export default function loginPage({users, highestId}) {
    
    return (
        <div>
                <LoginRegistration type={"sign-up"} users={users} highestId={highestId}/>
        </div>
    )
}

export async function getStaticProps(){
    let users;
    let highestId;
    try{
        users = await UsersAPI.readAll();
        highestId = await UsersAPI.getHighestId();

    } catch (e){
        users = null;
        highestId = null;
    }
    return{
        props: { users, highestId }, revalidate: 30
    }
}