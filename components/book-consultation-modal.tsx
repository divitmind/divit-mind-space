
"use client";

import * as React from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function BookConsultationModal({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = React.useState(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>{children}</DialogTrigger>
                <DialogContent className="sm:max-w-[425px] rounded-3xl bg-[#FDFBF7]">
                    <DialogHeader>
                        <DialogTitle className="text-[#2F3E33]">Book a Consultation</DialogTitle>
                        <DialogDescription>
                            Let's discuss how we can support your journey. Fill out the details below.
                        </DialogDescription>
                    </DialogHeader>
                    <ConsultationForm />
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>{children}</DrawerTrigger>
            <DrawerContent className="bg-[#FDFBF7]">
                <DrawerHeader className="text-left">
                    <DrawerTitle className="text-[#2F3E33]">Book a Consultation</DrawerTitle>
                    <DrawerDescription>
                        Let's discuss how we can support your journey.
                    </DrawerDescription>
                </DrawerHeader>
                <div className="px-4">
                    <ConsultationForm />
                </div>
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}

function ConsultationForm() {
    return (
        <form className="grid items-start gap-4">
            <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input type="email" className="h-11" id="email" defaultValue="" placeholder="name@example.com" />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" className="h-11" defaultValue="" placeholder="Your full name" />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" className="h-11" defaultValue="" placeholder="+1 (555) 000-0000" />
            </div>
            <Button type="submit" className="bg-[#2F3E33] h-11 hover:bg-[#2F3E33]/90 text-white">Request Call</Button>
        </form>
    );
}
