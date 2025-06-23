
export async function savePasswordToTxt(password: string): Promise<void> {
    try {
        const fileContent = `Password Generated: ${password}`;
        await Deno.writeTextFile("Generated_Password.txt", fileContent);
        console.info("✅ Password saved successfully at ./Generated_Password.txt");
    } catch (error) {
        console.error(`❌ Failed to save password as .txt: ${error}`);
    }
}