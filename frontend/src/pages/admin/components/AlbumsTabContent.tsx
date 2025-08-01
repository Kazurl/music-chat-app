import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AddAlbumDialog from "./AddAlbumDialog";
import AlbumsTable from "./AlbumsTable";


const AlbumsTabContent = () => {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle>
                        Albums Library
                    </CardTitle>
                    <CardDescription>Manage your music albums</CardDescription>
                    <AddAlbumDialog />
                </div>
            </CardHeader>
            <CardContent>
                <AlbumsTable />
            </CardContent>
        </Card>
    );
};

export default AlbumsTabContent;